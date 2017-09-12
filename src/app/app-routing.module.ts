//把整个路由模块独立出来

import { NgModule }      from '@angular/core';
//配置路由,先引用路由的模块
import { RouterModule , Routes } from  '@angular/router'
//每个组件都必须在一个(且只有一个)Angular模块中声明
import { HeroDetailComponent } from './hero-detail.component'; //路由到某一个特定的英雄详情时使用
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';

//把路由抽出到一个变量routes中
const routes : Routes = [
  {//重定向路由，当应用启动时，让其不是显示‘/’路径，而是‘/dashboard’路径
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
  	path: 'dashboard',
  	component: DashboardComponent
  },
  {//定义参数化的路由，用于跳转到某一个特定的英雄详情
  	path: 'detail/:id',//路径中的冒号 (:) 表示:id是一个占位符placeholder，当导航到这个HeroDetailComponent组件时，它将被填入一个特定英雄的id。
  	component: HeroDetailComponent
  },
  {
  	path: 'heroes',
  	component: HeroesComponent
  }
];

//1个路由模块RouterModule，其中forRoot方法，因为是在应用根部提供配置好的路由器，forRoot()方法提供了路由需要的路由service providers和directives，并基于当前浏览器 URL 初始化导航。
//forRoot方法中的，Path：路由器会用它来匹配浏览器地址栏中的地址(URL)，如heroes
//                 component: 导航到此路由时，路由器需要创建的组件

//如果有守卫服务，把它们添加到本模块的providers中（本例子中没有守卫服务）。
//把RouterModule添加到路由模块的exports中，以便关联模块（比如AppModule）中的组件可以访问路由模块中的声明，比如RouterLink 和 RouterOutlet
@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule{}