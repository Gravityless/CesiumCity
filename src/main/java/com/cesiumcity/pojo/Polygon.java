package com.cesiumcity.pojo;

public class Polygon {
    // id
    private Integer id;
    // name
    private String polygonName;
    // lontitude & latitude
    private String location;
    // margins xy
    private String margins;
    // some text
    private String description;
    // show or not
    private Integer status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPolygonName() {
        return polygonName;
    }

    public void setPolygonName(String polygonName) {
        this.polygonName = polygonName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getMargins() {
        return margins;
    }

    public void setMargins(String margins) {
        this.margins = margins;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getStatusStr(){
        if (status == null){
            return "未知";
        }
        return status == 0 ? "禁用":"启用";
    }

    @Override
    public String toString() {
        return "Polygon{" +
                "id=" + id +
                ", polygonName='" + polygonName + '\'' +
                ", location='" + location + '\'' +
                ", margins='" + margins + '\'' +
                ", description='" + description + '\'' +
                ", status=" + status +
                '}';
    }
}
