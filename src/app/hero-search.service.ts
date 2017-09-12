//背景
//请求并非总是“一次性”的。我们可以开始一个请求， 并且取消它，在服务器对第一个请求作出回应之前，再开始另一个不同的请求 。 像这样一个请求-取消-新请求的序列用承诺Promise是很难实现的，但接下来我们会看到，它对于可观察对象Observable却很简单。
//请求-取消-新请求的序列对于Promise来说是很难实现的，但是对Observable来说则很容易。

//我们要为《英雄指南》添加一个英雄搜索特性。 当用户在搜索框中输入一个名字时，我们将不断发起 HTTP 请求，以获得按名字过滤的英雄。
//把搜索请求发送到我们服务器上的 Web API。

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero } from './hero';

@Injectable()
export class HeroSearchService {
	constructor(private http: Http) {}

    //我们不再调用toPromise方法，而是从http.get 方法中返回一个Observable对象，之后调用RxJS的map操作符 来从返回数据中提取英雄。
	search(term: string): Observable<Hero[]>{
		return this.http
		           .get(`api/heroes/?name=${term}`)
		           .map(response => response.json().data as Hero[]);
		}
}