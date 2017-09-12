//制作英雄详情组件
//组件的类名应该是大驼峰形式，并且以Component结尾。 因此英雄详情组件的类名是HeroDetailComponent。
//组件的文件名应该是小写中线形式，每个单词之间用中线分隔，并且以.component.ts结尾。

import { Component , Input , OnInit } from '@angular/core';
import { Hero } from './hero';  //引用hero.js中的公共类

//通过路由中的参数获得想要显示的英雄详情---------------
//不会再从父组件的属性绑定中接收英雄数据。
//新的HeroDetailComponent应该从ActivatedRoute服务的可观察对象params中取得id参数，
//并通过HeroService服务获取具有这个指定id的英雄数据。
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from './hero.service';

import 'rxjs/add/operator/switchMap'; //switchMap方法用于将一个可观察的路由参数的id，映射到一个新的Observable可观察对象，即HeroService.getHero()方法的结果。

//hero-detail是之后在AppComponent中使用的标签名<hero-detail>
@Component({
	selector :'hero-detail',
	templateUrl :'./hero-detail.component.html',
	styleUrls: ['./hero-detail.component.css']
})


//由于hero作为一个输入属性由父组件app.component传进hero-detail.component，显示什么英雄
//hero属性前面加上@Input装饰器，来表明它是一个输入属性
export class HeroDetailComponent implements OnInit{
 @Input() hero: Hero ;

 //讲ActivatedRoute，HeroService，Location服务注入到构造函数中，并保存为私有值
 constructor(
 	 private activatedRoute: ActivatedRoute,
 	 private heroService: HeroService,
 	 private location: Location
 	){}

 //在以上的服务中，我们从ActivatedRoute服务的可观察对象getParams中提取id参数，
 //并且使用HeroService来获取具有这个id的英雄数据。。
 ngOnInit(): void{
    this.activatedRoute.paramMap.switchMap((getParams : ParamMap) =>
      this.heroService.getHero(+getParams.get('id'))
        ).subscribe(returnHero => this.hero = returnHero);
 }
 //switchMap中，getParams的数据类型是paramMap,是activatedRoute服务所观察到的路径中的参数
 //然后使用=>箭头函数，把拿到的getParams参数作为———-调用获取英雄信息的服务的getHero函数的参数所使用
 //其中，get('id'),是指获取名为id的参数，'+'加号是把参数的字符转换成数字
 //所以，switchMap函数的参数，就是获取英雄服务heroService.getHero()返回的英雄对象
 //然后再用.subscribe函数，把返回的英雄对象存给本类下hero属性中

 //添加一个返回上一部的函数
 //goBack()方法，它使用之前注入的Location服务,利用浏览器的历史堆栈，导航到上一步。
 goBack() :void{
 	this.location.back();
 }

 //把修改的英雄信息保存到数据库
 //save()方法用heroService的update()方法来持久化修改英雄名字，然后返回前一个视图
 save(): void{
 	this.heroService.update(this.hero)
 	    .then( () => this.goBack() );
 }
};
