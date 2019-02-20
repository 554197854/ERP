package com.erp.dao.impl;

import com.erp.dao.BaseDao;
import com.erp.dao.DepDao;
import com.erp.entity.Dep;
import com.erp.entity.DepList;
import org.hibernate.criterion.*;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;


import java.util.List;

/**
 * @author N
 * @create 2019/2/8 -- 16:46
 * @email 554197854@qq.com
 */
public class DepDaoImpl extends BaseDaoImpl<DepList,Dep> implements DepDao {



    public DetachedCriteria getDetachedCriteria(DepList deps, Object param) {
        DetachedCriteria detachedCriteria = DetachedCriteria.forClass(Dep.class);
        if (deps.getDeps()!= null&&deps.getDeps().size()>0) {
            Dep dep = deps.getDeps().get(0);
            if (dep != null) {
                if (dep.getName() != null && dep.getName().length() > 0) {
                    detachedCriteria.add(Restrictions.like("name", dep.getName(), MatchMode.ANYWHERE));
                }
                if (dep.getTele() != null && dep.getTele().length() > 0) {
                    detachedCriteria.add(Restrictions.like("tele", dep.getTele(), MatchMode.ANYWHERE));
                }
            }
        }
        return detachedCriteria;
    }
}
