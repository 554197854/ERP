package com.erp.biz.impl;

import com.erp.biz.DepBiz;
import com.erp.dao.DepDao;
import com.erp.entity.Dep;
import com.erp.entity.DepList;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author N
 * @create 2019/2/8 -- 17:44
 * @email 554197854@qq.com
 */
@Service
public class DepBizImpl implements DepBiz {

    private DepDao depDao;

    public void setDepDao(DepDao depDao) {
        this.depDao = depDao;
    }

    @Override
    public List<Dep> getList(DepList deps, Object param) {
        return depDao.getList(deps,param);
    }

    @Override
    public List<Dep> getList(DepList deps,Object param, int page, int rows) {
        return depDao.getList(deps,param,page,rows);
    }
    @Override
    public long getCount(DepList deps,Object param){
        return depDao.getCount(deps,param);
    };


}
