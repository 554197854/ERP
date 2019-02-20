package com.erp.dao;

import com.erp.entity.Dep;
import com.erp.entity.DepList;
import org.apache.poi.ss.formula.functions.T;

import java.util.List;

/**
 * @author N
 * @create 2019/2/9 -- 21:22
 * @email 554197854@qq.com
 */
public interface BaseDao<T,V> {

    /**
     * 条件查询
     * @param t1
     * @return
     */
    List<Dep> getList(T t1, Object param);
    /**
     * 分页查询
     * @param t1
     * @param param
     * @param page
     * @param rows
     * @return
     */
    List<Dep> getList(T t1, Object param, int page, int rows);

    /**
     * 记录条件查询的总记录数
     * @param t1
     * @return
     */
    long getCount(T t1,Object param);

    /**
     * 新增
     * @param t
     */
    void add(V t);

    /**
     * 删除
     */
    void delete(Long uuid);

    /**
     * 通过编号查询对象
     * @param uuid
     * @return
     */
    V get(Long uuid);

    /**
     * 通过编号查询对象
     * @param uuid
     * @return
     */
    V get(String uuid);

    /**
     * 更新
     */
    void update(V t);
}
