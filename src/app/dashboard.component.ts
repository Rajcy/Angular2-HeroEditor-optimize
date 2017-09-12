import { Component , OnInit } from '@angular/core';

import { Hero } from './hero';   //引用英雄的数据类型
import { HeroService } from './hero.service'; //引用获取英雄的服务

@Component({
	selector: 'my-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{

   heroes : Hero[] = [];   //创建一个heroes数组

   constructor(private heroService : HeroService){ };//在构造函数中注入HeroService，并且把它保存在一个私有的heroService字段中。

   ngOnInit(): void{        //在 Angular 的ngOnInit生命周期hook里面调用服务来获得英雄数据。
   	 this.heroService.getHeroes()
   	   .then(returnHeroes => this.heroes = returnHeroes.slice(1,5));  //Array.slice方法提取了四个英雄（第2、3、4、5个）。
   }
}