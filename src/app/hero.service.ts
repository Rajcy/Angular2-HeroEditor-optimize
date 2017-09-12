//服务名称的小写形式（基本名），加上.service后缀。
//如果服务名称包含多个单词，我们就把基本名部分写成中线形式 (dash-case)。
//例如，SpecialSuperHeroService服务应该被定义在special-super-hero.service.ts文件中。
import {Injectable} from '@angular/core';

import {Hero} from './hero';
//import {HEROES} from './mock-heroes';//引用模拟英雄数据

//模拟使用http访问服务器所需的引用
import { Headers,Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';//有很多像toPromise这样的操作符，用于扩展Observable，为其添加有用的能力。 如果我们希望得到那些能力，就得自己添加那些操作符。 那很容易，只要从 RxJS 库中导入它们就可以了，就像这样：

@Injectable()   //导入了 Angular 的Injectable函数，并作为@Injectable()装饰器使用这个函数。
export class HeroService {
	//8-3-2 同步方法
    // getHeroes(): Hero[] {     //stub  用于获取Hero数据的桩方法
    // 	return HEROES;
    // }

    //8-3-3 异步方法，使用Promise，在有了结果时，它承诺会回调我们。 我们请求一个异步服务去做点什么，并且给它一个回调函数。
    //它会去做（在某个地方），一旦完成，它就会调用我们的回调函数，并通过参数把工作结果或者错误信息传给我们。
    // getHeroes(): Promise<Hero[]>{
    // 	return Promise.resolve(HEROES);
    // }

    //异步方法，且带有2秒钟的等待缓冲
    getHeroesSlowly(): Promise<Hero[]>{
    	return new Promise(resolve => {
    		setTimeout(() => resolve(this.getHeroes()),2000);
    	});
    }

    //根据id,获取某一特定英雄数据。
    //具体实现为根据id从getHeroes()中过滤英雄列表
    // getHero(id: number): Promise<Hero>{
    //     return this.getHeroes()
    //                 .then(heroesFromGetHeroes => heroesFromGetHeroes.find(hero => hero.id === id));
    // }


    //模拟使用http访问服务器，来获得英雄数据getHeroes()--------------------------------------------------------------------
    private heroesUrl = 'api/heroes'; //URL to Web api
    constructor(private http: Http){}

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)  //http.get返回一个 RxJS 的Observable对象。 Observable（可观察对象）是一个管理异步数据流的强力方式
               .toPromise()                   //先利用toPromise操作符把Observable直接转换成Promise对象
               .then(response => response.json().data as Hero[]) //promise的then()回调中，这里使用了HTTP的Response对象的json方法，来提取其中的数据
                                              //这个由json方法返回的对象只有一个data属性。 这个data属性保存了英雄数组，所以我们取得这个数组，并且把它作为Promise的值进行解析。
               .catch(this.handleError);
    }

    //之前的getHero()函数，是将所有英雄都进行获取，然后再过滤出匹配id的那个，比较浪费资源--------------------------------------------------
    //于是乎目前模拟发起http请求，get-by-id
    getHero(id: number) : Promise<Hero>{      //返回的是单个英雄，而不是数组
        const url = `${this.heroesUrl}/${id}`;//通过在URL中添加英雄的id来告诉服务器应该获取那个英雄， 匹配api/heroes/:id模式
        return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as Hero)
               .catch(this.handleError);
    }


    //使用HTTP的put()方法来把名字的修改持久化到服务端------------------------------------------------------------------------
    private headers = new Headers({'Content-Type':'application/json'});
    update(hero: Hero): Promise<Hero>{
        const url = `${this.heroesUrl}/${hero.id}`; //通过一个编码在 URL 中的英雄 id 来告诉服务器应该更新哪个英雄
        return this.http.put(url,JSON.stringify(hero),{headers: this.headers}) //这里put的body主题是该英雄的JSON字符串，通过调用JSON.stringify得到的。并且在请求的header头部标记出body的content-type是application/json
               .toPromise()
               .then( () => hero )
               .catch(this.handleError);
     }

    //添加英雄
    create(name: String): Promise<Hero> {
        return this.http
                   .post(this.heroesUrl, JSON.stringify({name: name}) , {headers: this.headers})
                   .toPromise()
                   .then(res => res.json().data as Hero)
                   .catch(this.handleError);
    }

    //删除英雄，使用 HTTP 的 delete() 方法来从服务器上移除该英雄：
    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url,{headers: this.headers})
                        .toPromise()
                        .then(() => null)
                        .catch(this.handleError);
    }

    //异常获取与处理----------------------------------------------------------------------------------------
    private handleError(error: any): Promise<any>{
        console.error('An error occurred',error);

        //通过一个被拒绝 (rejected) 的Promise来把该错误用一个用户友好的格式返回给调用者
        return Promise.reject(error.message || error);
    }
}