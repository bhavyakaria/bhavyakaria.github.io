---
layout: post
title: A quick intro to Dependency Injection what it is, and when to use it
---

**_This article has been published in FreeCodeCamp Publication on [Medium]. Link to the article is [here]._**

### Introduction

>_In software engineering, **dependency injection** is a technique whereby one object (or static method) supplies the dependencies of another object. A dependency is an object that can be used (a service)._

That’s the Wikipedia definition but still, but it’s not particularly easy to understand. So let’s understand it better.

Before understanding what it means in programming, let’s first see what it means in general as it will help us understand the concept better.

Dependency or dependent means relying on something for support. Like if I say we are relying too much on mobile phones than it means we are dependent on them.

So before getting to [dependency injection], first let’s understand what a dependency in programming means.

When class A uses some functionality of class B, then its said that class A has a dependency of class B.

![alt text](/blog_images/1-dependency-injection/its_dependency.jpg "It's a Dependency!")

In Java, before we can use methods of other classes, we first need to create the object of that class (i.e. class A needs to create an instance of class B).

So, transferring the task of creating the object to someone else and directly using the dependency is called dependency injection.

![alt text](/blog_images/1-dependency-injection/comics_story.png "What if code could speak?")

### Why should I use dependency injection?

Let’s say we have a car class which contains various objects such as wheels, engine, etc.

```java
class Car{
  private Wheels wheel = new MRFWheels();
  private Battery battery = new ExcideBattery();
  ...
  ...
}
```
<p style="text-align: center; font-style: italic; font-size: 14px;">Without dependency injection(DI)</p>

Here the car class is responsible for creating all the dependency objects. Now, what if we decide to ditch MRFWheels in the future and want to use Yokohama Wheels?

We will need to recreate the car object with a new Yokohama dependency. But when using dependency injection (DI), we can change the Wheels at runtime (because dependencies can be injected at runtime rather than at compile time).

You can think of DI as the middleman in our code who does all the work of creating the preferred wheels object and providing it to the Car class.

It makes our Car class independent from creating the objects of Wheels, Battery, etc.

#### There are basically three types of dependency injection:

1. __constructor injection__: the dependencies are provided through a class constructor.
2. __setter injection__: the client exposes a setter method that the injector uses to inject the dependency.
3. __interface injection__: the dependency provides an injector method that will inject the dependency into any client passed to it. Clients must implement an interface that exposes a [setter method] that accepts the dependency.

```java
class Car{
  private Wheels wheel;
  private Battery battery;
  
  /*Somewhere in our codebase we instatiate the objects required by this class.
    There are two methods for implementing DI:
    1. Constructor based
    2. Setter based
  */
  
  // Constructor Based
  Car(Wheel wh, Battery bt) {
    this.wh = wh;
    this.bt = bt;
  }
  
  // Setter Based
  void setWheel(Wheel wh){
    this.wh = wh;
  }
  ...  
  ...
  // Rest of code  
}
```
<p style="text-align: center; font-style: italic; font-size: 14px;">Dependency injection(DI) Example</p>

##### So now its the dependency injection’s responsibility to:

1. Create the objects
2. Know which classes require those objects
3. And provide them all those objects

If there is any change in objects, then DI looks into it and it should not concern the class using those objects. This way if the objects change in the future, then its DI’s responsibility to provide the appropriate objects to the class.

### Inversion of control —the concept behind DI

This states that a class should not configure its dependencies statically but should be configured by some other class from outside.

It is the fifth principle of S.O.L.I.D — the five basic principles of object-oriented programming and design by Uncle Bob — which states that a class should depend on abstraction and not upon concretions (in simple terms, hard-coded).

According to the principles, a class should concentrate on fulfilling its responsibilities and not on creating objects that it requires to fulfill those responsibilities. And that’s where dependency injection comes into play: it provides the class with the required objects.

_**Note: If you want to learn about SOLID principles by Uncle Bob then you can head to this [link].**_

### Benefits of using DI

1. Helps in Unit testing.
2. Boiler plate code is reduced, as initializing of dependencies is done by the injector component.
3. Extending the application becomes easier.
4. Helps to enable loose coupling, which is important in application programming.

### Disadvantages of DI

1. It’s a bit complex to learn, and if overused can lead to management issues and other problems.
2. Many compile time errors are pushed to run-time.
3. Dependency injection frameworks are implemented with reflection or dynamic programming. This can hinder use of IDE automation, such as “find references”, “show call hierarchy” and safe refactoring.

You can implement dependency injection on your own (Pure Vanilla) or use third-party libraries or frameworks.

### Libraries and Frameworks that implement DI
* [Spring] (Java)
* [Google Guice] (Java)
* [Dagger] (Java and Android)
* [Castle Windsor] (.NET)
* [Unity] (.NET)
* [Di-Ninja] (Javascript)
* [knifecycle] (Javascript)

**To learn more about dependency injection, you can check out the below resources:**

[Java Dependency Injection — DI Design Pattern Example Tutorial — JournalDev]

[Using dependency injection in Java — Introduction — Tutorial — Vogella]

[Inversion of Control Containers and the Dependency Injection pattern — Martin Fowler]

Hope it helps!

If you have any questions or feedback for me than let’s connect on [LinkedIn], [Twitter] , [Facebook].


_**Thanks to [Sergey Ufocoder] now this article has been converted into the Russian language. My Russian friends and who all can read the Russian language do give it a read.**_

[Link to the article]


Thanks for all the kind words that I have been receiving. Do share the article so that more and more people can be benefited.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[here]: https://medium.freecodecamp.org/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f
[Medium]: https://medium.com/
[dependency injection]: https://en.wikipedia.org/wiki/Dependency_injection
[setter method]: https://en.wikipedia.org/wiki/Mutator_method
[link]: https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#toc-single-responsibility-principle

[Spring]: https://www.tutorialspoint.com/spring/spring_dependency_injection.htm
[Google Guice]: https://github.com/google/guice
[Dagger]: https://square.github.io/dagger/ 
[Castle Windsor]: https://github.com/castleproject/Windsor
[Unity]: https://www.microsoft.com/en-us/download/details.aspx?id=39944
[Di-Ninja]: https://di-ninja.github.io/di-ninja/
[knifecycle]: https://github.com/nfroidure/knifecycle
[auryn]: https://github.com/rdlowrey/auryn

[Java Dependency Injection — DI Design Pattern Example Tutorial — JournalDev]: https://www.journaldev.com/2394/java-dependency-injection-design-pattern-example-tutorial
[Using dependency injection in Java — Introduction — Tutorial — Vogella]: https://www.vogella.com/tutorials/DependencyInjection/article.html
[Inversion of Control Containers and the Dependency Injection pattern — Martin Fowler]: https://www.martinfowler.com/articles/injection.html

[Bhavya Karia]: https://medium.com/@bhavyankaria
[Sergey Ufocoder]: https://medium.com/u/7a7d59054bae
[Link to the article]: https://medium.com/@xufocoder/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-de1367295ba8
[LinkedIn]: https://www.linkedin.com/in/bhavya-karia-1b115a93/
[Twitter]: https://twitter.com/thebhavyakaria
[Facebook]: https://www.facebook.com/karia.bhavya