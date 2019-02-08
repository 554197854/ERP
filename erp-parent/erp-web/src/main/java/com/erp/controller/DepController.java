package com.erp.controller;

import com.alibaba.fastjson.JSON;
import com.erp.biz.DepBiz;
import com.erp.entity.Dep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author N
 * @create 2019/2/8 -- 17:48
 * @email 554197854@qq.com
 */
@Controller
public class DepController {

    @Autowired
    private DepBiz depBiz;

    @RequestMapping(value = "/dept",produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getList() {
        List<Dep> list = depBiz.getList();
        String string = JSON.toJSONString(list);
        return string;

    }
}
