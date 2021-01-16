---
layout: post
title: Why do we need constructors?
---

Before finding the answer to why do we need constructors? Lets first understand what are constructors?

<b>As per Wikipedia's definition,</b><br>

>A constructor is a special type of subroutine called to create an object. It prepares the new object for use, often accepting arguments that the constructor uses to set required member variables.

### What is subroutine?
It is a set of instructions designed to perform a frequently used operation within a program.

### In Layman's term
Constructors are just a set of instructions that are executed at the time of object creation. They resemble the instance method but differs from a method since they have no explicit return type.

### Key points
  1. Have same name as the declaring class
  2. Initialize object's data members
  3. Immutable objects must be initialized in a constructor
  4. Most languages allow having more than one constuctor with different parameters (Method overloading)

Now that we know what a constructor is and it's key properties.

### Why do we need constructors?

1. To initialze your object with default or initial state.
2. To inform the world about the dependencies required by your class to do its job.
3. To not break inheritance chain.

Let's understand what each of the point means.

### 1. To initialze your object with default or initial state

In Object-Oriented Programming, whenever we create an object, we have to first initialize the member variables and its initial state. This is done so that we don't use the object without initializing those variables or else we might get undesired results.

And for that purpose, we have constructors where we can do all the initializing stuff. 

### 2. To inform the world about the dependencies required by your class to do its job

First of all, there are two ways to set up dependencies, setter injection and constructor way. Using constructor for setting up dependencies helps in readability since whoever is creating an object of your class knows that it requires some sort of dependencies and they need to provide it.

Also, in today's world with modern frameworks Dependency Injection becomes quite easy with the help of constructors.

### 3. To not break the inheritance chain

In Java, everything extends into an Object class. And if there is no constructor then Java won't be able to initialize the Object class on its own and pass on the Object class methods and variables down to our class. I guess we could initialize it manually but then it would be manual work and user-dependent.

#### Fun Fact

>When a child class extends a parent class, it inherits member variables, non-final and non-static methods but not constructors from the parent class. Constructors belong to the class they are declared.

I hope the article helped you to understand why do we need constructors and what all benefits they have. And by no means have we talked about constructors in detail, there is a lot to know about constructors but will keep that for some other day.

If you have any questions or feedback for me than let’s connect on [LinkedIn], [Twitter] , [Facebook].

[LinkedIn]: https://www.linkedin.com/in/bhavya-karia-1b115a93/
[Twitter]: https://twitter.com/thebhavyakaria
[Facebook]: https://www.facebook.com/karia.bhavya

