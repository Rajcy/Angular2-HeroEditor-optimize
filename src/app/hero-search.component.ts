import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from './hero-search.service';
import { Hero }              from './hero';

@Component({
	selector: 'hero-search',
	templateUrl: './hero-search.component.html',
	styleUrls:  ['./hero-search.component.css'],
	providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit {

	heroes: Observable<Hero[]>;
	private searchTerms = new Subject<string>();

    constructor(
    	private heroSearchService : HeroSearchService,
    	private router : Router){}

       // Push a search term into the observable stream.
	   //每次调用search()函数，都会使一个新的字符串添加到这个叫searchTerms的的Subject类型的observable数据流中(通过调用Subject的next()方法)
	   search(term: string): void{
	    	this.searchTerms.next(term);
	    }

		/*
		如果我们直接把每一次用户按键都直接传给HeroSearchService，就会发起一场 HTTP 请求风暴。 这可不好玩。我们不希望占用服务器资源，也不想耗光蜂窝移动网络的流量。
		不过，我们可以在字符串的Observable后面串联一些Observable操作符，来归并这些请求。 我们将对HeroSearchService发起更少的调用，并且仍然获得足够及时的响应。
		做法如下：
		在传出最终字符串之前，debounceTime(300)将会等待，直到新增字符串的事件暂停了 300 毫秒。 我们实际发起请求的间隔永远不会小于 300ms。
		distinctUntilChanged确保只在过滤条件(输入框)变化时才发送请求， 这样就不会重复请求同一个搜索词了。
		switchMap()会为每个从debounce和distinctUntilChanged中通过的搜索词调用搜索服务。 它会取消并丢弃以前的搜索可观察对象，只保留最近的。
		*/

        //初始化 heroes 属性(ngOnInit)
        //Subject也是一个Observable对象。 我们要把搜索词的流转换成Hero数组的流，并把结果赋值给heroes属性。
	    ngOnInit(): void {
	     this.heroes = this.searchTerms
	      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
	      .distinctUntilChanged()   // ignore if next search term is same as previous
	      .switchMap(term => term   // switch to new observable each time the term changes
	        // return the http search observable
	        ? this.heroSearchService.search(term)
	        // or the observable of empty heroes if there was no search term
	        : Observable.of<Hero[]>([]))
	      .catch(error => {
	        // TODO: add real error handling
	        console.log(error);
	        return Observable.of<Hero[]>([]);
	      });
	  }

	    gotoDetail(hero: Hero): void {
    	  let link = ['/detail', hero.id];
    	  this.router.navigate(link);
	    }

	    /*
	      借助switchMap操作符 (正式名称是flatMapLatest)，switchMap()保留了原始的请求顺序，并且只返回最近一次 http 调用返回的可观察对象。 
	      这是因为以前的调用都被取消或丢弃了。
	    */
}