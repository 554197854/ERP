package com.erp.dao.impl;

import com.erp.dao.DepDao;
import com.erp.entity.Dep;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;

import java.util.List;

/**
 * @author N
 * @create 2019/2/8 -- 16:46
 * @email 554197854@qq.com
 */
public class DepDaoImpl extends HibernateDaoSupport implements DepDao {
    @Override
    public List<Dep> getList() {
        return (List<Dep>) getHibernateTemplate().find("from Dep");
    }
}
