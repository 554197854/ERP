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