import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule} from '@angular/forms'; //引用FormsModule模块，让ngModel可以使用

import { AppComponent }  from './app.component';

//每个组件都必须在一个(且只有一个)Angular模块中声明
import { HeroDetailComponent } from './hero-detail.component'; //路由到某一个特定的英雄详情时使用
import { HeroesComponent } from './heroes.component';
import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent }from './hero-search.component';
//配置路由,先引用路由的模块
//import { RouterModule } from  '@angular/router';

//把路由模块单独出来后进行引用
import { AppRoutingModule } from './app-routing.module';

//注册HTTP服务
//我们要能从本应用的任何地方访问这些服务，就要把HttpModule添加到AppModule的imports列表中
import { HttpModule } from '@angular/http';
//模拟Web API，通过使用in-memory web API.来模拟在Http客户端，从服务器端获取与保存数据
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  imports:      [ BrowserModule ,
                  FormsModule,     // <-- import the FormsModule before binding with [(ngModel)]
                  AppRoutingModule,// 引用单独出来的路由模块，引用RouterModule
                  HttpModule,      //注册HTTP服务
                  InMemoryWebApiModule.forRoot(InMemoryDataService) //绑定模拟服务器模块
                ],
  declarations: [ AppComponent,        //通常，declarations数组包含应用中属于该模块的组件、管道和指令的列表。 组件在被其它组件引用之前必须先在一个模块中声明过。//这个模块声明了4个组件：AppComponent 和 HeroDetailComponent,HeroesComponent，DashboardComponent
                  HeroDetailComponent, //把HeroDetailComponent添加到该module模块的declarations数组中
                  HeroesComponent,     //把HeroesComponent添加到该module模块的declarations数组中
                  DashboardComponent,  //把DashboardComponent添加到该module模块的declarations数组中
                  HeroSearchComponent  //HeroSearchComponent,英雄搜索模块，此处进行声明注册
                ],
  providers:    [ HeroService ],       //此处用于注册全应用级的服务。把HeroService的provider提升到NgModule中，把HeroesComponent中使用的provider去除
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
