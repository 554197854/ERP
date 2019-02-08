import com.erp.dao.DepDao;
import com.erp.entity.Dep;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

/**
 * @author N
 * @create 2019/2/8 -- 16:55
 * @email 554197854@qq.com
 */
public class Test {


    @org.junit.Test
    public void test(){

        ApplicationContext applicationContext = new ClassPathXmlApplicationContext(new String[]{"classpath:applicationContext_dao.xml","classpath:applicationContext_datasource.xml"});
        DepDao depDao = (DepDao)applicationContext.getBean("depDao");
        List<Dep> list = depDao.getList();
        for (Dep dep:list){
            System.out.println(dep.getName());
        }

    }
}
