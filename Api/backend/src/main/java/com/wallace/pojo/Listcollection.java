package com.wallace.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * @TableName listcollection
 */
@TableName(value ="listcollection")
@Data
public class Listcollection implements Serializable {
    private Integer colid;

    private Integer uid;

    private Integer isTeam;

    private Integer isRecent;

    private Integer version;

    private Integer isDeleted;

    private static final long serialVersionUID = 1L;
}