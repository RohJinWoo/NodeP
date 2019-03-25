
// 첫번째 ajax로 DB의 게시판 글의 개수를 가져와 페이지네이션 처리를 행함
// 두번째 페이지네이션 처리가 완료되면 첫번째 페이지에 해당하는 게시글을 가져옴.

var pagenation = {
    board_num : undefined, // DB의 게시글 갯수
    board_list_num : 10, //  페이지에 몇개의 게시글을 보여주는지(기본값 : 10)
    page_num : undefined, // 페이지네이션의 개수
    now_page : undefined, // 현재 페이지
    num : {},
    title : {},
    subject : {},
    auth : {},
    date : {},
    pagenation_div : u.qu('#pagenation_div'),
    pagenation_num : function(){
        axios.post('../page/count_board_num')
        .then((response) => {
            this.board_num = response.data.board_num;
            console.log("this.board_num : ", this.board_num);
            this.page_num = this.board_num % this.board_list_num === 0 ? this.board_num / this.board_list_num : Math.ceil(this.board_num / this.board_list_num);
            console.log("this.page_num : ", this.page_num);
            // this.board_num = response;
            this.pagenation_draw();
        })
        .catch(function(response){
            console.log('error');
        });
    },
    pagenation_draw : function(){
        console.log(this.pagenation_div);
    }
}

pagenation.pagenation_num();
