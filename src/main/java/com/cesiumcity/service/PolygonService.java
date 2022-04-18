package com.cesiumcity.service;

import com.cesiumcity.pojo.Polygon;
import com.cesiumcity.pojo.PageBean;

import java.util.List;

public interface PolygonService {

    /**
     * 查询所有
     * @return
     */
    List<Polygon> selectAll();

    /**
     * 添加数据
     * @param polygon
     */
    void add(Polygon polygon);

    /**
     * 批量删除
     * @param ids
     */
    void deleteByIds(int[] ids);

    /**
     * 分页查询
     * @param currentPage
     * @param pageSize
     * @return
     */
    PageBean<Polygon> selectByPage(int currentPage, int pageSize);

    /**
     * 分页条件查询
     * @param currentPage
     * @param pageSize
     * @param polygon
     * @return
     */
    PageBean<Polygon> selectByPageAndCondition(int currentPage, int pageSize, Polygon polygon);
}
