import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";
import GlobalStyle from "../components/GlobalStyle"
import '../App.css'
import { useNavigate } from 'react-router-dom';
import CardOne from '../components/CardOne';

const Container = styled.div`
  display : flex;
  flex-wrap : wrap;
  gap : 2%;
  margin: 10px 0;
`

const InputContainer = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
`

function Home() {

  const card = useSelector((state) => {
    return state.Card;
  });

  const Context = useSelector((state) => {
    return state.SaveContext;
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const contextChangeHandler = (event) => {
    let inputname = event.target.name;
    switch (inputname) {
      case 'titleInput':
        dispatch({ 
          type : 'title',
          payLoad : event.target.value,
        })
        break;
      case 'contextInput':
        dispatch({ 
          type : 'context',
          payLoad : event.target.value,
        })
        break;
      case 'dateInput':
        dispatch({ 
          type : 'date',
          payLoad : event.target.value,
        })
        break;
    }
  };

  const saveBtnClickHandler = () => {
    dispatch({
      type: 'save',
      payLoad: Context
    })
    dispatch({
      type : 'clear',
      payLoad: {
        title:'',
        date:'',
        context:'',
      }
    })
  };

  const deleteBtnClickHandler = (id) => {
    dispatch({
      type: 'delete',
      payLoad: id,
    })
  };

  const changeIsDoneHandler = (id) => {
    dispatch({
      type : 'complete',
      payLoad : id,
    })
  }

  return (
    <>
      <GlobalStyle />
      <div className='App'>
        <div className="save-Box">
          <InputContainer className="inputTitle">
            <label>제목</label>
            <input name='titleInput' onChange={contextChangeHandler} value={Context.title} maxLength={15} type="text" placeholder='제목을 입력하세요.(최대 15자)' />
            <label>기한 날짜</label>
            <input name='dateInput' value = {Context.date} onChange={contextChangeHandler} type="date" />
          </InputContainer>
          <InputContainer className='inputContext'>
            <label>상세 내역</label>
            <textarea name='contextInput' value = {Context.context} onChange={contextChangeHandler} cols={30} rows={4} type="text" placeholder='내용을 입력하세요.' />
          </InputContainer>
          <InputContainer className='buttonBox'>
            <button onClick={saveBtnClickHandler}> 저장하기 </button>
            <button onClick={() => {
              navigate('/complete')
            }}>완료 List</button>
          </InputContainer>
        </div>
        <div className='Card-List'>
          <h3 style={{
            color: 'red',
          }}>🕐 해야할 일</h3>
          <Container>
          {card.map((card) => {
            if (card.isDone === false) {
              return <CardOne deleteBtnClick={deleteBtnClickHandler} changeBtnClick={changeIsDoneHandler} key={card.id} card={card}/>
            }
            return null;
          }
          )}
          </Container>
        </div>
      </div>
    </>
  )
}

export default Home