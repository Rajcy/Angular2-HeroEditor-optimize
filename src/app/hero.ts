//Hero类仍然在app.component.ts文件中。 现在，有两个组件需要Hero类的引用。 而Angular风格指南建议每个文件中只有一个类。
//因此我们要把Hero类从app.component.ts移到它自己的hero.ts文件中

export class Hero{
	id :number;
	name :String;
};