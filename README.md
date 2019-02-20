# ERP
**错误日志**

错误问题1：
    java.lang.UnsupportedClassVersionError: oracle/jdbc/driver/OracleDriver : Unsupported major.minor version 52.0
错误原因：
    由于自己安装的Oralce版本是12c 第2版，支持的JDK版本是1.8，而自己使用的1.7出现此错误。
解决方法：
    使用JDK1.8启动

错误问题2：
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath:applicationContext_*.xml");由于需要加载2个xml，使用*.xml扫描，但是出现错误
解决方法：
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext(new String[]{"classpath:applicationContext_dao.xml","classpath:applicationContext_datasource.xml"});
使用数组代替*.xml加载多个xml文件

错误问题3：
    经过springmvc返回的html页面乱码，分析应该是tomcat默认编码问题。
解决方法：
    目前是通过在html页面加上<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>标签处理乱码
    对返回Json乱码则是@RequestMapping(value = "/dept",produces = {"application/json;charset=UTF-8"})处理

错误问题4：
    springmvc接收多个Dep同对象实体
解决方法：
    添加一个DepList类，成员变量 private List<Dep> deps，Controller接收DepList deps对象，前端则使用
    部门名称：<input name="deps[0].name" >
    联系电话：<input name="deps[0].tele" >
    这种方式传输