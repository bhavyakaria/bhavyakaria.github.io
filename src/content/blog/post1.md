---
title: "Learning Android Development the Hard Way"
description: "Documented all my learnings reagrding developing Android apps"
pubDate: "Sep 10 2022"
heroImage: "/blogs/learning-android-hard-way/android-blog.webp"
tags: ["android", "tech"]
---

<strong>*This article has been published in ProAndroidDev Publication on [Medium](https://www.medium.com). Link to the article is [here](https://proandroiddev.com/learning-android-development-the-hard-way-1a8358ac1186).*</strong>

### TL;DR: For the lazy !

> Below are some of the tips that I have learnt about Android Development over the last few years. Have a look, they might help you as well to become a better Android Developer.

Its been two years since I decided to start with Android Development and without a doubt that has been one of the best decision I have taken. On my journey to become an Android Developer, I have made various errors and learnt a couple of things from it.

So I would like to share with you’ll those tips and tricks that I have learnt on the way so that it can help **someone who is just starting out or is struggling to develop android apps.**

### 1. Java vs Kotlin — It doesn’t matter!

17 May 2017, on this auspicious day Google announced [Kotlin](https://kotlinlang.org/) as [official programming language](https://android-developers.googleblog.com/2017/05/android-announces-support-for-kotlin.html) for Android Development. Now people got confused whether to use Java or move to Kotlin? Yes Kotlin is awesome and I would personally recommend learning it but if you don’t know Kotlin and still want to start developing apps in Java then its cool, even I started with Java and still code in Java sometimes. You can learn Kotlin on the go it isn’t that hard.

<figure>
  <img src="/blogs/learning-android-hard-way/java_vs_kotlin.webp" alt="One of many reasons why I ❤️ Kotlin">
  <figcaption class="text-center">One of many reasons why I ❤️ Kotlin</figcaption>
</figure>

### 2. Architecture Patterns — Your App needs Architecture!

When you start developing basic applications for learning purpose, having an architecture won’t matter a lot but as you start developing apps for real world users, you will be needing an architecture pattern. I know learning this patterns isn’t easy and you might be tempted to skip it but DON’T.

Having an architecture helps you to achieve Simplicity, Testability and Maintainability.

**Some of the popular one’s are:**
1. **MVVM** (Model-View-ViewModel)
2. **MVP** (Model-View-Presenter)
3. **MVC** (Model-View-Controller)

Apart from this architectures, you might also want to checkout about [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) from [Uncle Bob](https://en.wikipedia.org/wiki/Robert_C._Martin). Some companies even create their own architecture.You can learn more about them [here](https://developer.android.com/studio/build/optimize-your-build).

<strong>*Note:Prior I used to think its Clean Architecture vs MVVM/MVC/MVP but I was wrong and thanks to [Sviatoslav Melnychenko](https://medium.com/@shakenbeer) for rectifying me here.*</strong>

**MVVM/MVC/MVP** is a way to structure a presentation layer whereas **Clean Architecture** is a way to structure the whole application.

### 3. Debugging tools — Use these tools to dissect your app

When I started out, like every other Android Developer even I used Logger library provided by android for debugging. But then while releasing the app, I used to manually remove `Log.d()` statements. I know that’s a dumb thing to do when you have a big and complex project.

<figure>
  <img src="/blogs/learning-android-hard-way/giphy.gif" alt="Obama being disappointed">
</figure>

I learnt from my mistakes and came to know about **Progaurd** first and then **Timber** and other awesome debugging tools.

**[Timber](https://github.com/JakeWharton/timber) — Say bye bye to Log.d()**

It is a superb logger tool developed by an awesome person [Jake Wharton](https://github.com/JakeWharton/timber). It is a logger with a small, extensible API which provides utility on top of Android’s normal Log class.

**[Stetho](https://facebook.github.io/stetho/) — A debug bridge for Android applications**

When enabled, we can debug our application using Chrome Developer Tools like we can intercept network calls, checkout if data is getting stored in local android database and what got stored in Shared Preferences. It has helped me a lot while debugging. Thanks to the team at Facebook who developed this awesome library.

**[LeakyCanary](https://github.com/square/leakcanary) — Find those leak culprits**

If you have just started out android development then you might feel overwhelmed by this tool but once you get hand of it, your app performance will improve and those nasty crashes that users face will reduce.

**[ProGuard](https://stuff.mit.edu/afs/sipb/project/android/docs/tools/help/proguard.html) — Is your friend**

The ProGuard tool shrinks, optimizes, and obfuscates your code by removing unused code and renaming classes, fields, and methods with semantically obscure names. Its a must if you are launching your app on Google Play Store.

### 4. Use libraries BUT be Careful

You shouldn’t re-invent the wheel, so go and use a library that makes your work easy. But that doesn’t mean you go out there and add all those libraries that you like. Use libraries only if you need them. There are certain libraries which I use in almost all of my projects simply because they are awesome and not only using them saves me some precious time but also make my apps better(By no means I’m saying they are the best of the lot).

[Glide](https://github.com/bumptech/glide) — For handling Image downloading and caching

[Room](https://developer.android.com/topic/libraries/architecture/room) — For storing data locally

[Retrofit](https://square.github.io/retrofit/) — Seamlessly making API Calls

[Gson](https://github.com/google/gson) — JSON to POJO and vice-versa

[Data Binding](https://developer.android.com/topic/libraries/data-binding/) — For binding UI components without using findViewById()

[LiveData](https://developer.android.com/topic/libraries/architecture/livedata) — For updating view if there is any change in data

Tip: This is just the tip of iceberg. There are many more awesome libraries developed by many amazing people which you checkout out [here](https://github.com/ribot/android-guidelines/blob/master/project_and_code_guidelines.md) and [here](https://github.com/aritraroy/UltimateAndroidReference).

### 5. Code, Code, Code BUT follow guidelines!

The more code you write, the better you gonna be as a coder. But while coding follow guidelines, find out what are the best practices, can you make the code more efficient,shorter? Invest time in learning design patterns.

Apart from learning to code, also learn to read code. You might seem what a foolish thing I’m saying, every developer knows how to read. But reading in general is different and reading code to understand is different.

> “Remember that there is no code faster than no code.”

**Bonus:** To start with, you must thoroughly go through [this](https://developer.android.com/studio/build/optimize-your-build) and [this](https://github.com/ribot/android-guidelines/blob/master/project_and_code_guidelines.md).

### 6. UI/UX is not a joke

The user using your app should not have a hard time while moving around in the app. It should be a seamless process. Read Design Guidelines set by Google on [material design](https://material.io/). Checkout patterns used by popular apps. Get user feedback.

> The user using your app should not have a hard time while moving around in the app. It should be a seamless process. Read Design Guidelines set by Google on material design . Checkout patterns used by popular apps. Get user feedback.

**Tip:** You can checkout latest mobile UI designs at [Mobbin](https://mobbin.design/) and [mobile-patterns](https://mobile-patterns.com/).

### 7. Build Gradle needs your attention!

As your project is gonna get complex, your build times are gonna sky rocket. So use all those tips and tricks out there on web to speed up your build time.

**Tip:** You can also use [Genymotion](https://www.genymotion.com/) for a better emulator.

### 8. Android Studio is your arena

Know your way around Android Studio and by that I mean you should invest time in knowing the shortcuts, creating live templates. It will help you in increasing your productivity.

[Ayusch Jain](https://medium.com/@jain.ayusch10) helps us out here by writing a good blog post [11 Android Studio Shortcuts every Android Developer must know](https://medium.com/mindorks/11-android-studio-shortcuts-every-android-developer-must-know-a153e736e611).

### 9. Document your work

If you come across some complex stuff or if you find certain task/components that you keep on reusing then document them somewhere so that in future you don’t have to waste time in learning them again. I like to create repositories on Github and provide step by step guide on using it. You can also write a blog post or create a YouTube video, this will help you a lot in future.

You can check my android step-by-step guide [here](https://github.com/bhavyakaria/Android). Also when we are teaching it to others, we understand the topic much better.

### 10. Prototyping is the key my friend

Remember, me saying don’t re-invent the wheel, if there is a library which helps you out then use it. Yes, use it but try to play with that library in a demo project before implementing in your project. This will help you understand the library better.

**Pro Tip:** Checkout that awesome library directly from the command line using [dryrun](https://github.com/cesarferreira/dryrun).

### 11. Ask those silly doubts

Don’t be shy to ask your silly doubts. The android developer community is very helpful. Reach out to the people and get your doubt solved. Never implement or use a component without having proper knowledge about it.

> “A little Learning is a dangerous Thing.”

**Tip 1:** Try giving back to the community in the form of blog post, [YouTube](https://youtube.com/) video, answering on [StackOverflow] or helping out a fellow developer.

### 12. Test as if your life depends on it

As a beginner, writing test or using any testing libraries might be difficult for you. No issues, try out with rigorous manual testing and then slowly learn to use various testing framework and start writing tests. But before deploying your app on Play store, checkout out all the scenarios.

**Tip:** Testing your apps on low-end devices will give you better overview on where your app needs improvement.

### 13. Git needs your attention

Invest time in learning Git. When you are the only one working on the project then it will be a child’s play to add, commit and push on Git.

But the problem’s gonna arise when you will be working with other developers on the same app. Those merge conflicts have ruined so many evenings.

So you better learn Git from [here](https://lab.github.com/courses?tag=Git).

### 14. KISS — Keep It Simple Stupid!

When you have just started out learning, you come across various tutorials and various best practices. You might unknowingly complicate your project while applying those practices, so try to keep it as simple as possible. If a particular architecture pattern or best practice doesn’t fit in your use-case, then don’t apply it just because everyone is using it and talking about it.
