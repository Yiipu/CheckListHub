package com.wallace.pojo;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import lombok.Data;

/**
 * @TableName collection_to_checklist
 */
@TableName(value ="collection_to_checklist")
@Data
public class CollectionToChecklist implements Serializable {
    @TableId
    private Integer id;

    private Integer colid;

    private Integer cid;

    private Timestamp viewTime;

    @Version
    private Integer version;
    @TableLogic
    private Integer isDeleted;

    private static final long serialVersionUID = 1L;

//    private  CkList ckList = new CkList();
}