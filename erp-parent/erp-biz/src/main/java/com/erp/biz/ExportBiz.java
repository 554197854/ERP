package com.erp.biz;

import com.erp.entity.Dep;

import java.io.OutputStream;
import java.util.List;

/**
 * @author N
 * @create 2019/2/12 -- 21:50
 * @email 554197854@qq.com
 */
public interface ExportBiz {
    void export(List<Dep> list, OutputStream os);
}
