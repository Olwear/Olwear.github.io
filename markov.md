# markov

* [硬举就完事](#硬举就完事)
  * [网页console中获取可用的卡牌](#网页console中获取可用的卡牌)
  * [C++穷举运行代码](#c穷举运行代码)
* [网页console中获取已有和缺失的卡牌](#网页console中获取已有和缺失的卡牌)
* [网页console中批量获取分享链接](#网页console中批量获取分享链接)
* [成就汇总](#成就汇总)

# 硬举就完事

**~~运行js前可能需要引入jQuery~~**

```js
a = document.createElement("script");
a.setAttribute("type","text/javascript");
a.setAttribute("src","https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.min.js");
document.head.appendChild(a);
```

## 网页console中获取可用的卡牌

```js
var a = new Array();
$("#markov > div.css-106fzi8 > div > div.chakra-container.css-bjq0u0 > div.chakra-container.css-1mkavtn > div:nth-child(2) > div.swiper-wrapper > div.swiper-slide > div > div > div:nth-child(1)").each(function () {
    if (!$(this).parent(":contains('已使用')").length) {
        a.push(parseInt($(this).text()));
    }
});
a.sort(function (a, b) { return a - b; });
console.log("可用数字\n", a.join(','));

var a = Array.from($("#markov > div.css-106fzi8 > div > div.chakra-container.css-bjq0u0 > div.chakra-container.css-1mkavtn > div:nth-child(4) > div.swiper-wrapper > div.swiper-slide > div > div > div:nth-child(1)").filter(function () {
    return !$(this).parent(":contains('已使用')").length;
}).text());
a.sort();
console.log("可用运算符\n", a.join(""));
```

> 以上获取的数据可直接复制到下面的程序中

## C++穷举运行代码

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    // 数字替换
    // 7 007
    // 运算符替换
    // p **
    // / //
    // < <<
    // > >>
    int nums[] = {};
    char ops[] = {""};
    int nnum = sizeof(nums) / 4, nop = sizeof(ops) - 1;
    if (nnum < 4 || nop < 3)
    {
        cout << "No more cards\n";
        return 0;
    }
    sort(nums, nums + nnum);
    sort(ops, ops + nop);
    for (int i = 0; i <= nnum - 4; ++i)
    {
        do
        {
            for (int j = 0; j <= nop - 3; ++j)
            {
                do
                {
                    int a = nums[i];
                    for (int l = 0; l != 3; ++l)
                    {
                        switch (ops[j + l])
                        {
                        case '+':
                            a += nums[i + l + 1];
                            break;
                        case '-':
                            a -= nums[i + l + 1];
                            break;
                        case '*':
                            a *= nums[i + l + 1];
                            break;
                        case 'p':
                            a = pow(a, nums[i + l + 1]);
                            break;
                        case '%':
                            if (!nums[i + l + 1])
                            {
                                a = -1;
                                break;
                            }
                            a %= nums[i + l + 1];
                            break;
                        case '/':
                            if (!nums[i + l + 1])
                            {
                                a = -1;
                                break;
                            }
                            a /= nums[i + l + 1];
                            break;
                        case '|':
                            a |= nums[i + l + 1];
                            break;
                        case '&':
                            a &= nums[i + l + 1];
                            break;
                        case '^':
                            a ^= nums[i + l + 1];
                            break;
                        case '<':
                            a <<= nums[i + l + 1];
                            break;
                        case '>':
                            a >>= nums[i + l + 1];
                            break;
                        default:
                            break;
                        }
                        if (a < 0)
                        {
                            break;
                        }
                    }
                    if (a == 1024)
                    {
                        printf("%d", nums[i]);
                        for (int l = 0; l != 3; ++l)
                        {
                            printf(" %c %d", ops[j + l], nums[i + l + 1]);
                        }
                        putchar(10);
                    }
                } while (next_permutation(ops + j, ops + j + 3));
            }
        } while (next_permutation(nums + i, nums + i + 4));
    }
    return 0;
}
```

***

## 网页console中获取已有和缺失的卡牌

```js
var s = new Set();
$("#markov > div.css-106fzi8 > div > div.chakra-container.css-bjq0u0 > div.chakra-container.css-1mkavtn > div:nth-child(2) > div.swiper-wrapper > div.swiper-slide > div > div > div:nth-child(1)").each(function () {
    s.add(this.innerText);
});
var a = Array.from(s);
var d = ['0', '1', '2', '3', '4', '5', '6', '007', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '955', '965', '996', '1024', '1075', '1337'].filter(function (e) {
    return !a.includes(e);
});
console.log('\n已有数字\n', a, '\n缺失的数字\n', d);

var s = new Set();
$("#markov > div.css-106fzi8 > div > div.chakra-container.css-bjq0u0 > div.chakra-container.css-1mkavtn > div:nth-child(4) > div.swiper-wrapper > div.swiper-slide > div > div > div:nth-child(1)").each(function () {
    s.add(this.innerText);
});
var a = Array.from(s);
var d = ['%', '&', '*', '**', '+', '-', '//', '<<', '>>', '^', '|'].filter(function (e) { return !a.includes(e); });
console.log('\n已有运算符\n', a, '\n缺失的运算符\n', d);
```

***

## 网页console中批量获取分享链接

```js
var a = new Array();
var x = new Array();
$("#markov > div.css-106fzi8 > div > div.chakra-container.css-bjq0u0 > div.chakra-container.css-1mkavtn > div:nth-child(2) > div.swiper-wrapper > div.swiper-slide > div > div > div:nth-child(1)").each(function () {
    if (!$(this).parent(":contains('已使用')").length) {
        a.push([$(this).text(), $(this).parent().find("[data-id]").attr("data-id")]);
    }
});
a.sort(function (a, b) { return parseInt(a) - parseInt(b); });
for (var i in a) {
    x.push(a[i][0] + " https://leetcode.cn/2022-1024?id=" + a[i][1] + "&userSlug=" + userSlug);
}

var a = new Array();
$("#markov > div.css-106fzi8 > div > div.chakra-container.css-bjq0u0 > div.chakra-container.css-1mkavtn > div:nth-child(4) > div.swiper-wrapper > div.swiper-slide > div > div > div:nth-child(1)").each(function () {
    if (!$(this).parent(":contains('已使用')").length) {
        a.push([$(this).text(), $(this).parent().find("[data-id]").attr("data-id")]);
    }
});
a.sort();
var userSlug = $("#__next > div > div > div.css-lqoj36 > a.css-s7lz5y").attr("href").slice(3);
for (var i in a) {
    x.push(a[i][0] + " https://leetcode.cn/2022-1024?id=" + a[i][1] + "&userSlug=" + userSlug);
}

console.log(x.join("\n"));
```

***

# 成就汇总

![image.png](https://pic.leetcode.cn/1666845859-Hfddaz-image.png)

* 还没毕业
  * 收集所有卡牌
* 福报
  * 收集 **996 007**
* 二进制收集者
  * 收集二进制运算符
* 搬空商店
  * 字面意思
* WLB
  * 收集 **965 1075**
* 十进制收集者
  * 收集十进制运算符
