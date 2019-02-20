package com.erp.biz.impl;

import com.erp.biz.ExportBiz;
import com.erp.entity.Dep;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

/**
 * @author N
 * @create 2019/2/12 -- 21:51
 * @email 554197854@qq.com
 */
public class ExportBizImpl implements ExportBiz {
    @Override
    public void export(List<Dep> list, OutputStream os) {
        //创建工作簿
        HSSFWorkbook wb = new HSSFWorkbook();
        //设置一个工作簿名称
        HSSFSheet sheet = wb.createSheet("部门信息");
        //使用此工作簿创建标题行
        HSSFRow row = sheet.createRow(0);

        HSSFCell cell = null;
        String[] names = {"部门名称","部门电话"};
        int i=0;
        for(String n:names){
            cell = row.createCell(i);
            cell.setCellValue(n);
            i++;
        }

        int j=1;
        for(Dep dep:list){
            row=sheet.createRow(j);
            cell = row.createCell(0);
            cell.setCellValue(dep.getName());
            cell = row.createCell(1);
            cell.setCellValue(dep.getTele());
            j++;
        }

        try {
            wb.write(os);
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                wb.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}
