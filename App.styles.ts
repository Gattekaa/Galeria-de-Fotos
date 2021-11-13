import styled from "styled-components";

export const Container = styled.div`
    background-color: #141d2e;
    color: #FFF;
    min-height: 100vh;
`;

export const Area = styled.div`
margin: auto;
max-width: 980px;
padding: 30px 0;
`;

export const Header = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
    margin-bottom: 30px;
`;

export const ScreenWarning = styled.div`
    text-align: center;

    .emoji {
        font-size: 50px;
        margin-bottom: 50px;
    }
`;

export const PhotoList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-row: auto;
    grid-area: auto / auto / auto / auto;
    gap: 20px;

    @media(max-width: 800px) {
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
        margin: 0 15px;
    }
`;

export const UploadForm = styled.form`
    background-color: rgba(61, 63, 67, 0.3);
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 30px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    input[type=submit] {
        background-color: #756DF4;
        border: 0;
        color: #FFFFFF;
        padding: 8px 16px;
        border-radius: 10px;
        margin: 0 20px;
        cursor: pointer;

        &:hover {
            opacity: .9;
        }
    }



    
`;