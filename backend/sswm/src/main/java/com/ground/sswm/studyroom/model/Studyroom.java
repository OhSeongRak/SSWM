package com.ground.sswm.studyroom.model;

import com.ground.sswm.studyroom.model.dto.StudyroomDto;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Studyroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String notice;

    private boolean isPublic;

    private String enterCode;

    private int maxUserNum;

    private int maxRestTime;

    @ColumnDefault("0")
    private int studyAvgTime;

    private String image;

    @ColumnDefault("FALSE")
    private boolean isDeleted;

    @ColumnDefault(value = "0")
    private long createdAt;

    private int userNum;

  public boolean getIsPublic() {
    return this.isPublic;
  }

  public boolean getIsDeleted() {
    return this.isDeleted;
  }


    @Builder
    public Studyroom(String name, String notice, boolean isPublic, String enterCode,
        int maxUserNum, int maxRestTime, int studyAvgTime, String image, boolean isDeleted,
        long createdAt) {
        this.name = name;
        this.notice = notice;
        this.isPublic = isPublic;
        this.enterCode = enterCode;
        this.maxUserNum = maxUserNum;
        this.maxRestTime = maxRestTime;
        this.studyAvgTime = studyAvgTime;
        this.image = image;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
    }

    public static Studyroom from(StudyroomDto studyroomDto) {
        return Studyroom.builder()
            .name(studyroomDto.getName())
            .notice(studyroomDto.getNotice())
            .isPublic(studyroomDto.isPublic())
            .enterCode(studyroomDto.getEnterCode())
            .maxUserNum(studyroomDto.getMaxUserNum())
            .maxRestTime(studyroomDto.getMaxRestTime())
            .image(studyroomDto.getImage())
            .createdAt(studyroomDto.getCreatedAt())
            .build();
    }

    public void setUpdates(StudyroomDto studyroomDto) {
        this.setName(studyroomDto.getName());
        this.setNotice(studyroomDto.getNotice());
        this.setPublic(studyroomDto.isPublic());
        this.setEnterCode(studyroomDto.getEnterCode());
        this.setMaxUserNum(studyroomDto.getMaxUserNum());
        this.setMaxRestTime(studyroomDto.getMaxRestTime());
        this.setImage(studyroomDto.getImage());
    }
}
