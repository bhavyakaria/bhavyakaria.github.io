---
layout: post
title: Why do we need constructors?
---

Before finding the answer to why do we need constructors? Lets first understand what are constructors?

<b>As per Wikipdedia's defination,</b><br>

>A constructor is a special type of subroutine called to create an object. If prepares the new object for use, often accepting arguments that the constructor uses to set required member variables.


### What are subroutine?
They are a set of instructions designed to perform a frequently used operation within a program.

### In Layman's term
Constructors are just a set of instructions that are executed at the time of object creation. They resemble instance method but differs from a method since they have no explicit return type.

### Key points
  1. Have same name as the declaring class
  2. Initialize object's data members
  3. Immutable objects must be initialized in a constructor
  4. Most languages allow having more than one constuctor with different parameters (Method overloading)

Now that we know what a constructor is and it's key properties.

### Why do we need constructors?

1. To initialze your object with default or initial state.
2. To inform the world about dependencies required by your class to do its job.
3. To not break inheritance chain.

Let's understand what each of the point means.

### To initialze your object with default or initial state


