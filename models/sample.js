'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sample = sequelize.define('Sample', {
    s_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    s_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});
  Sample.associate = function(models) {
    // associations can be defined here
    /* 
    hasOne: 외래 키 추가, 단일 연관
    belongsTo: 외래 키 및 단일 연관 추가
    hasMany: 대상에 복수 키 추가, 소스에 복수 연관 추가
    belongsToMany: 조인 테이블과의 n:m 관계를 만들고 소스에 복수 연관 추가
    연관을 만들면 외래 키 제약 조건이 속성에 추가된다. 모든 cascase 연결은 업데이트시
    및 set null 삭제시에 사용하며, n:m 삭제시에도 사용된다.

    연결을 만들때 as를 통해 별칭을 제공할 수 있다. 이는 동일 모델이 두번 연관되거나 
    대상 모델의 이름이 아닌 다른 이름으로 연결되도록할 때 사용.

    ex) 사용자가 많은 사진을 가지고 있고 그 중 하나가 프로필 사진일 때.

    User.hasMany(Picture)
    User.belongsTo(Picture, { as: 'ProfilePicture', constraints: false })

    user.getPictures() // gets you all pictures
    user.getProfilePicture() // gets you only the profile picture

    User.findAll({
      where: ...,
      include: [
        { model: Picture }, // load all pictures
        { model: Picture, as: 'ProfilePicture' }, // load the profile picture.
        // Notice that the spelling must be the exact same as the one in the association
      ]
    })

    같은 모델(Pictrue)에서 쉽게 프로필 사진을 로드할 수 있다. 자세한 내용은 해당 문서 참조.
    http://docs.sequelizejs.com/class/lib/associations/base.js~Association.html
    
    */
  };
  return Sample;
};