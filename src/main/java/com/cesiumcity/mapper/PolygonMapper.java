package com.cesiumcity.mapper;

import com.cesiumcity.pojo.Polygon;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface PolygonMapper {

    /**
     * 查询所有
     * @return
     */
    @Select("select * from tb_polygon")
    @ResultMap("polygonResultMap")
    List<Polygon> selectAll();

    /**
     * 添加数据
     * @param polygon
     */
    @Insert("insert into tb_polygon values(null, #{polygonName},#{location},#{margins},#{description},#{status})")
    void add(Polygon polygon);

    /**
     * 批量删除
     * @param ids
     */
    void deleteByIds(@Param("ids") int[] ids);

    /**
     * 分页查询
     * @param begin
     * @param size
     * @return
     */
    @Select("select * from tb_polygon limit #{begin},#{size}")
    @ResultMap("polygonResultMap")
    List<Polygon> selectByPage(@Param("begin") int begin, @Param("size") int size);

    /**
     * 查询总记录数
     * @return
     */
    @Select("select count(*) from tb_polygon")
    int selectTotalCount();

    /**
     * 分页&条件查询
     * @param begin
     * @param size
     * @return
     */
    List<Polygon> selectByPageAndCondition(@Param("begin") int begin, @Param("size") int size, @Param("polygon") Polygon polygon);

    /**
     * 条件查询总记录数
     * @return
     */
    int selectTotalCountByCondition(Polygon polygon);
}
