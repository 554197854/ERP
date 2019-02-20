package com.erp.biz;

import com.erp.entity.Dep;
import com.erp.entity.DepList;

import java.util.List;

/**
 * @author N
 * @create 2019/2/8 -- 17:44
 * @email 554197854@qq.com
 */
public interface DepBiz {
    List<Dep> getList(DepList deps,Object param);
    List<Dep> getList(DepList deps,Object param, int page, int rows);
    long getCount(DepList deps,Object param);



}
