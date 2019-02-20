package com.erp.controller;

import com.alibaba.fastjson.JSON;
import com.erp.biz.DepBiz;
import com.erp.biz.ExportBiz;
import com.erp.entity.Dep;
import com.erp.entity.DepList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author N
 * @create 2019/2/8 -- 17:48
 * @email 554197854@qq.com
 */
@Controller
public class DepController {

    @Autowired
    private DepBiz depBiz;
    @Autowired
    private ExportBiz exportBiz;

    @RequestMapping(value = "/dept",produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getList(DepList deps,Object param, @RequestParam(value = "page",defaultValue = "1") int page, @RequestParam(value = "rows",defaultValue = "10")int rows) {
        List<Dep> list = depBiz.getList(deps,param,(page-1)*rows,rows);
        Map mapData = new HashMap();
        long total = depBiz.getCount(deps,param);

        mapData.put("total",total);
        mapData.put("rows",list);
        String string = JSON.toJSONString(mapData);
        return string;

    }

    @RequestMapping("/dep")
    public ModelAndView show(){

        return new ModelAndView("dep");
    }


    @RequestMapping("/export")
    public String export(DepList deps, Object param, HttpServletResponse response){
        List<Dep> list =  depBiz.getList(deps,param);
        try {
            String fileName = "test.xlsx";
            response.setHeader("Content-disposition", "attachment;filename="
                    + new String(fileName.getBytes("gb2312"), "ISO8859-1"));//设置文件头编码格式
            response.setContentType("APPLICATION/OCTET-STREAM;charset=UTF-8");//设置类型
            exportBiz.export(list,response.getOutputStream());
        }catch (Exception e){
            e.printStackTrace();
        }

        return  null;

    }


}
