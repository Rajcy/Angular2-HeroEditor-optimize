import { Component } from '@angular/core';
import { Hero } from './hero';  //引用hero.js中的公共类

import {HeroService} from './hero.service';//8-1导入HeroService

import { OnInit } from '@angular/core'; //8-3-2获取当前Component的生命周期，OnInit为刚创建时，还有每次变化时，最终销毁时

import { Router } from '@angular/router';//9 引用Angular路由器库，导入Router，用于英雄详情页的跳转

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'] //styleUrls属性是一个由样式文件的文件名(包括路径)组成的数组。我们还可以列出来自多个不同位置的样式文件。

	//providers:[HeroService] //8-3 注册HeroService的provider,用来告诉注射器injector如何创建HeroService的实例
    //providers的定义位置提升至app.module.ts中
})

//8-3-2 在component初始化时，同步调用服务时 implements OnInit
export class HeroesComponent implements OnInit {
	name = 'Angular';
	title ='Tour of Heros'; //1内联数据绑定

    heros = ['Winstorm','Bombasto','Mageta','Tornado'];   //3数组绑定,ngFor
    myHero = this.heros[1];

    firstHero : Hero = {        //4Hero对象
	 id : 1,
	 name: 'Raj'
    };


    type : String;          //2构造函数数据绑定
    number : number;
    constructor(
	   //8-2在构造函数中注入HeroService,构造函数自己什么也不用做，它在参数中定义了一个私有的heroService属性，并把它标记为注入HeroService的靶点。
	    private heroService: HeroService,
        private router: Router  //9 用于英雄详情页的跳转
	  ){
    	this.type = 'SuperHero';
        this.number = 5;

        //8-3-1直接调用服务
        //this.heroes = this.heroService.getHeroes();
    };

    //8-3-2 Component初始化时调用服务
    ngOnInit(): void{
    	this.getHeroes();
    }

    //heroes = HEROES;   //5创建一个公共属性用于绑定与显示这些英雄
                         //这里不需要明确定义heroes属性的数据类型，TypeScript 能从HEROES数组中推断出来。
    //由于英雄信息组件化到服务中获取
    //8-0所以在这里定义一个尚未初始化的heroes属性
    heroes:Hero[];

    selectedHero : Hero; //7 新建一个Hero的类对象，但不再需要赋值，因为将通过点击事件，把点击的heroes数组中选中的hero信息赋值给selectedHero
    onSelect(hero :Hero): void{       //这里的onSelect函数定义中，传入的参数类型必须是Hero的类的实例
    	this.selectedHero = hero ;    //this.selectedHero 指向的是109行中定义的selectedHero，this指向AppComponent
    };

    // getHeroes(): void {  //8-3-2 调用服务的函数(同步)
    //     this.heroes = this.heroService.getHeroes();
    // };

    getHeroes(): void {  //8-3-3 调用服务的函数(异步)  this.heroService.getHeroes()为马上异步调用
        this.heroService.getHeroes().then(returnHeroes => this.heroes = returnHeroes); //returnHeroe 为heroService服务的返回值，然后把值赋给this.heroes
       // this.heroService.getHeroesSlowly().then(returnHeroes => this.heroes = returnHeroes);
    };

    //将一个包含两个元素的链接参数数组 — 路径和路由参数 — 传递到路由的navigate(),与之前在DashboardComponent中使用[routerLink]绑定格式一样
    gotoDetail(): void{  //9 跳转到具体的英雄详情页
      this.router.navigate(['/detail',this.selectedHero.id]);
    };

    //添加英雄：当指定的名字不为空的时候，点击处理器就会委托 hero 服务来创建一个具有此名字的英雄， 并把这个新的英雄添加到我们的数组中。
    add(name: string): void {
        name = name.trim();
        if(!name){return;}
        this.heroService.create(name)
                        .then(hero => {
                            this.heroes.push(hero);
                            this.selectedHero = null;
                        });
    }

    //删除英雄，如果删除的是正选中的英雄，还会清空选择
    delete(hero: Hero): void{
        this.heroService.delete(hero.id)
                        .then(() => {
                            this.heroes = this.heroes.filter(heroExcept => heroExcept !== hero);
                            if(this.selectedHero === hero){
                                this.selectedHero = null;                            }
                        });
    }
};

//4新建Hero对象，因为英雄需要更多的属性
// export class Hero{
// 	id :number;
// 	name :String;
// };
//组件化到hero.ts中，进行类的引用即可

//5 HEROS是由Hero类的实例构成的数组（此处为模拟从Web服务中获取的英雄列表）
// const HEROES : Hero[] = [
//     { id: 11, name: 'Mr. nice'},
//     { id: 12, name: 'Narco'},
//     { id: 13, name: 'Bombasto'},
//     { id: 14, name: 'Celeritas' },
//     { id: 15, name: 'Magneta' },
//     { id: 16, name: 'RubberMan' },
//     { id: 17, name: 'Dynama' },
//     { id: 18, name: 'Dr IQ' },
//     { id: 19, name: 'Magma' },
//     { id: 20, name: 'Tornado'}
//   ];
//作为模拟数据，组件化到到mock-heroes.ts文件中,并且使用hero.service.ts中的服务进行数据获取

