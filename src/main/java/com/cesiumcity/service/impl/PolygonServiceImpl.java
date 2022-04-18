package com.cesiumcity.service.impl;

import com.cesiumcity.mapper.PolygonMapper;
import com.cesiumcity.pojo.Polygon;
import com.cesiumcity.pojo.PageBean;
import com.cesiumcity.service.PolygonService;
import com.cesiumcity.util.SqlSessionFactoryUtils;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import java.util.List;

public class PolygonServiceImpl implements PolygonService {
    // 创建工厂对象
    SqlSessionFactory factory = SqlSessionFactoryUtils.getSqlSessionFactory();

    @Override
    public List<Polygon> selectAll() {
        // 获取session对象
        SqlSession sqlSession = factory.openSession();
        // 获取polygon mapper对象
        PolygonMapper mapper = sqlSession.getMapper(PolygonMapper.class);
        // 调用方法
        List<Polygon> polygons = mapper.selectAll();
        // 释放资源
        sqlSession.close();

        return polygons;
    }

    @Override
    public void add(Polygon polygon) {
        // 获取session对象
        SqlSession sqlSession = factory.openSession();
        // 获取polygon mapper对象
        PolygonMapper mapper = sqlSession.getMapper(PolygonMapper.class);
        // 调用方法
        mapper.add(polygon);
        // 提交事务
        sqlSession.commit();
        // 释放资源
        sqlSession.close();
    }

    @Override
    public void deleteByIds(int[] ids) {
        // 获取session对象
        SqlSession sqlSession = factory.openSession();
        // 获取polygon mapper对象
        PolygonMapper mapper = sqlSession.getMapper(PolygonMapper.class);
        // 调用方法
        mapper.deleteByIds(ids);
        // 提交事务
        sqlSession.commit();
        // 释放资源
        sqlSession.close();
    }

    @Override
    public PageBean<Polygon> selectByPage(int currentPage, int pageSize) {
        // 获取session对象
        SqlSession sqlSession = factory.openSession();
        // 获取polygon mapper对象
        PolygonMapper mapper = sqlSession.getMapper(PolygonMapper.class);
        // 计算索引
        int begin = (currentPage - 1) * pageSize;
        // 调用方法
        List<Polygon> rows = mapper.selectByPage(begin, pageSize);
        int totalCount = mapper.selectTotalCount();
        // 封装PageBean
        PageBean<Polygon> polygonPageBean = new PageBean<>();
        polygonPageBean.setRows(rows);
        polygonPageBean.setTotalCount(totalCount);
        // 释放资源
        sqlSession.close();

        return polygonPageBean;
    }

    @Override
    public PageBean<Polygon> selectByPageAndCondition(int currentPage, int pageSize, Polygon polygon) {
        // 获取session对象
        SqlSession sqlSession = factory.openSession();
        // 获取polygon mapper对象
        PolygonMapper mapper = sqlSession.getMapper(PolygonMapper.class);
        // 计算索引
        int begin = (currentPage - 1) * pageSize;
        // 处理表达式
        String polygonName = polygon.getPolygonName();
        if (polygonName != null && polygonName.length() > 0) {
            polygon.setPolygonName("%" + polygonName + "%");
        }
        String location = polygon.getLocation();
        if (location != null && location.length() > 0) {
            polygon.setLocation("%" + location + "%");
        }
        // 调用方法
        List<Polygon> rows = mapper.selectByPageAndCondition(begin, pageSize, polygon);
        int totalCount = mapper.selectTotalCountByCondition(polygon);
        // 封装PageBean
        PageBean<Polygon> polygonPageBean = new PageBean<>();
        polygonPageBean.setRows(rows);
        polygonPageBean.setTotalCount(totalCount);
        // 释放资源
        sqlSession.close();

        return polygonPageBean;
    }
}
