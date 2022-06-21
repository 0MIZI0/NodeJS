// 체크박스 하나만 선택되게 하기
function chooseOnlyOneCheckBox(selectedCheckBox, id){
    seletedId = id
    if(selectedCheckBox.checked){     // 체크박스를 체크한 경우
        var obj = document.getElementsByName("dramaListCheckbox"); // 모든 체크박스 객체 리스트
        for(var i=0; i<obj.length; i++){
            if(obj[i] != selectedCheckBox){   // 현재 선택된 체크박스가 아니면 체크 해제
                obj[i].checked = false;
            }
        }
        document.querySelector('form').setAttribute('action', `/update/${id}`)        // form 태그의 action 속성을 update 요청으로 수정
        document.getElementById('deleteBtn').setAttribute('href', `/delete/${id}`)    // deleteBtn href 속성 수정
        title = document.getElementById(`title${id}`).innerText                       // 선택된 드라마 제목 텍스트 저장
        actor = document.getElementById(`actor${id}`).innerText                       // 선택된 드라마 배우 텍스트 저장
        document.getElementById('title').setAttribute('value', title)                 // form 태그의 title 입력상자에 선택된 드라마 제목 설정
        document.getElementById('actor').setAttribute('value', actor)                 // form 태그의 actor 입력상자에 선택된 드라마 배우 설정
        document.getElementById('submitBtn').setAttribute('value', '수정')            // submitBtn 버튼의 텍스트를 "수정"으로 변경
    }else{    // 체크박스가 체크해제된 경우
        document.querySelector('form').setAttribute('action', `/`)                    // form 태그의 action 속성을 /로 수정
        document.getElementById('deleteBtn').setAttribute('href', `#`)                // deleteBtn이 동작하지 않도록 수정
        document.getElementById('title').setAttribute('value', '')                    // form 태그의 title 입력상자 내용 지우기
        document.getElementById('actor').setAttribute('value', '')                    // form 태그의 actor 입력상자 내용 지우기
        document.getElementById('submitBtn').setAttribute('value', '전송')            // submitBtn 버튼의 텍스트를 "전송"으로 변경
    }
  }