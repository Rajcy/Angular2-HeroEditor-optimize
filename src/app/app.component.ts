import {Component} from '@angular/core';

//router-outlet 是作为路由的出口存在的，当我们把/heroes粘贴到URL上当路由匹配到时，
//路由就睡把HeroesComponent激活并显示在<router-outlet>中
//routerLink  作为一个锚标签，告诉用户点击该链接时将导航到哪个路径
//routerLinkActive 作为当该路由链接被激活时，该路由标签会使用的样式
@Component({
	selector:'my-app',
	template:`
     <h1>{{title}}</h1>
	   <nav>
     	<a routerLink="/heroes" routerLinkActive="active">Heroes</a>
		<a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
	   </nav>
     <router-outlet></router-outlet>
	`,
	styleUrls: ['./app.component.css']
})

export class AppComponent{
	title = "Big Tour of Heroes";
}

