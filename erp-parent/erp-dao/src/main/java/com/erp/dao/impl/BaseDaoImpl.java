package com.erp.dao.impl;

import com.erp.dao.BaseDao;
import com.erp.entity.Dep;
import com.erp.entity.DepList;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

/**
 * @author N
 * @create 2019/2/9 -- 21:32
 * @email 554197854@qq.com
 */
public class BaseDaoImpl<T,V> extends HibernateDaoSupport implements BaseDao<T,V> {

    private Class<T> entityListClass;
    private Class<V> entityClass;

    public BaseDaoImpl(){
        //获取对象对应的父类的类型
        Type baseDaoImplClass = this.getClass().getGenericSuperclass();
        System.out.println(baseDaoImplClass);
        //转成带参数，即泛型的类型
        ParameterizedType pType = (ParameterizedType)baseDaoImplClass;
        System.out.println(pType);
        //获取参数泛型类型数组
        Type[] types = pType.getActualTypeArguments();
        System.out.println(types);
        //由于我们的BaseDao<T>的泛型参数里只有一个类型T，因此数组的第一个元素就是类型T的实际上的类型
        entityListClass = (Class<T>)types[0];
        System.out.println(entityListClass);
        entityClass = (Class<V>)types[1];
        System.out.println(entityClass);
    }

    @Override
    public List<Dep> getList(T t1, Object param) {
        DetachedCriteria detachedCriteria = getDetachedCriteria(t1, param);
        return (List<Dep>) getHibernateTemplate().findByCriteria(detachedCriteria);
    }

    @Override
    public List<Dep> getList(T t1, Object param, int page, int rows) {
        DetachedCriteria detachedCriteria = getDetachedCriteria(t1, param);
        return (List<Dep>) getHibernateTemplate().findByCriteria(detachedCriteria, page, rows);
    }

    @Override
    public long getCount(T t1, Object param) {
        DetachedCriteria detachedCriteria = getDetachedCriteria(t1,param);
        detachedCriteria.setProjection(Projections.rowCount());
        List<Long> o = (List<Long>) getHibernateTemplate().findByCriteria(detachedCriteria);
        return (long) o.get(0);
    }

    @Override
    public void add(V t) {
        getHibernateTemplate().save(t);

    }

    @Override
    public void delete(Long uuid) {
        V v = getHibernateTemplate().get(entityClass, uuid);
        getHibernateTemplate().delete(v);
    }

    @Override
    public V get(Long uuid) {

        return getHibernateTemplate().get(entityClass,uuid);
    }

    @Override
    public V get(String uuid) {
        return getHibernateTemplate().get(entityClass,uuid);
    }

    @Override
    public void update(V t) {
        this.getHibernateTemplate().update(t);
    }

    public DetachedCriteria getDetachedCriteria(T t1, Object param){

        return null;
    }
}
