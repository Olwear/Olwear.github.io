# 路由交换

查看系统信息
> display version

修改系统时间
> clock timezone local add 8:00:00
>
> clock datetime 00:00:00 2022-6-8

查看生效的新系统时间
> display clock

将 Console 接口登录方式配置为密码认证方式，密码为明文

设置空闲超时时间

> user-interface console 0
>
> authentication-mode password
>
> set authentication password cipher huawei
>
> idle-timeout 10 0

查看当前目录下的文件列表
> dir

查看保存的配置文件
> display saved-configuration

保存当前配置文件
> save

查看已保存的配置信息
> display saved-configuration

查看当前配置信息
> display current-configuration

查看下次启动时使用的配置文件
> display startup

重启设备
> reboot

***

查看交换机接口的详细信息
> display interface  g0/0/1

关闭自协商，设置交换机接口的半/全双工模式和速率

> interface g0/0/1
>
> undo negotiation auto
>
> speed 10
>
> duplex half/full

查看交换机的MAC地址表
> display mac-address

向MAC地址表添加静态条目
> mac-address static 009a-cd11-1111 g0/0/1 vlan 1

修改MAC地址动态条目的老化时间
> mac-address aging-time

查看系统当前的MAC地址老化时间
> display mac-address aging-time

***
***

创建VLAN

> vlan 1
>
> vlan batch 1 2

显示VLAN详细信息
> display vlan 1

删除VLAN
> undo vlan 1

将接口加入VLAN
> port link-type access
>
> port default vlan 1
>
> port link-type trunk
>
> port trunk allow-pass vlan 1 2/all

***

将接口加入VLAN
> port link-type hybrid
>
> port hybrid pvid VLAN 1
>
> port hybrid untagged vlan 1 100

查看特定VLAN的信息
> display vlan 1

启用和查看VLAN的流量统计
> vlan 1
>
> statistic enable
>
> disp vlan 1 statistics

查看VLAN的汇总信息
> display vlan summary

***
开启GVRP功能
> gvrp
>
> int g0/0/1
> gvrp

修改交换机接口的注册模式(禁止注册/禁止通过)
> gvrp registration fixed/forbidden

***
***

启用STP并修改优先级
> stp enable
>
> stp mode stp
>
> stp priority 4096

查看STP信息
> display stp

查看接口角色
> display stp brief

查看接口
> display stp interface

修改接口开销值
> stp cost 20000

***

启用RSTP
> stp mode rstp

指定根网桥和备用根网桥
> stp root primary/secondary

配置边缘接口
> stp edged-port enable

启用BPDU保护功能
> stp bpdu-protection

***
进入MST域视图
> stp region-configuration

指定MST域名，
> region-name 0

创建MSTI和VLAN的映射关系
> instance 10 vlan 10

激活MST配置
> active region-configuration

为MSTI指定根网桥/备用网桥
> stp instance 1 root primary/secondary

查看MST域配置信息
> check region-configuration

***
***

“2SA”板卡
> s接口

查看路由器的路由表
> display ip routing-table

为接口配置IP地址
> ip address 127.0.0.1 32

***

配置静态路由(和路由优先级)
> ip route-static 10.0.2.0 24 192.168.0.1 (preference 80)

***
***

创建接口组1
> port-group 1

将G0/0/1—G0/0/12归入接口组1
> group-member g0/0/1 to g0/0/12

创建子接口
> interface g0/0/1.10

为路由器的子接口启用VLAN
> dot1q termination vid 10

启用ARP广播帧处理
> arp broadcast enable

***

配置三层交换机VLANIF接口
> interface Vlanif 1

***
***
配置RIP
> rip
>
> network 10.0.0.0(有类网络)

配置RIPv2
> rip
>
> version 2

查看路由器详细RIP信息
> display rip

查看路由器上RIP接口的详细信息
> display rip 1 interface s1/0/0 verbose

开启RIP调测功能
> debugging rip 1

查看当前的调测信息
> display debugging

关闭调测功能
> undo debugging rip 1/all

启用接口上的毒性反转特性
> rip poison-reverse
***
Loopback环回接口
> 一种逻辑接口，这里使用环回接口来模拟路由器所连接的4个子网

查看路由器上的IP接口状态
> display ip interface brief

查看通过RIP学习到的路由信息
> display ip routing-table protocol rip

禁用水平分隔
> undo rip split-horizon

配置RIPv2下发默认路由
> defualt-route originate

配置RIPv2认证
> rip authentication-mode simple
>
> rip authentication-mode md5 nonstatndard simple plain huawei
>
> rip authentication-mode md5 nonstandard cipher huawei 123

***
***
启用 OSPF
> ospf 100 router-id 1.1.1.1

选择OSPF配置的区域
> area 0

声明OSPF启用的网络
> network 10.8.0.1 0.0.0.0(反掩码)

上看 OSPF 路由
> display ip routing-table protocol ospf

查看路由器所有邻居的概览信息
> display ospf peer brief

查看详细邻居信息
> display ospf peer

查看接口上的OSPF有关参数
> display ospf 100 interface g0/0/0

为路由器配置OSPF的认证
> authentication-mode md5 1 plain/cipher huawei
>
> ospf authentication-mode simple plain huawei

修改Hello计时器
> ospf timer hello 10

配置Dead计时器
> ospf timer dead 40

静默所有接口的OSPF通告
> silent-interface all

启用接口上的OSPF通告
> undo silent-interface s1/0/0

接口OSPF开销=带宽参考值/接口链路带宽

取消接口的OSPF开销值
> undo ospf cost

指定路由器OSPF的带宽参考值
> bandwidth-reference 100

***
指定虚链路另一端的路由器
> vlink-peer 1.1.1.1

查看路由器的OSPF虚链路信息
> display ospf vlink

查看路由器的OSPF链路状态数据（LSDB）
> display ospf lsdb

注入RIP路由到OSPF路由域中
> import-route rip 1

将该区域设置为NSSA区域
> nssa

限制ABR向NSSA区域通告此类LSA
> nssa no-summary
