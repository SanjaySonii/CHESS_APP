<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CHESS</title>
    <link rel="stylesheet" href="project20_Chess.css">
    <style>
        @media screen and (max-width : 1310px) {
            #container {
                right: 5rem;
            }
        }

        @media screen and (max-width : 1145px) {
            #container {
                right: 0rem;
            }
        }

        @media screen and (max-width : 1010px) {
            .box {
                width: 4rem;
                height: 4rem;
                border: 2px solid black;
            }

            .Chess_Elements {

                font-size: 4rem;
                width: 4rem;
                height: 4rem;
            }

            .refresh {
                top: 27rem;
            }
        }

        @media screen and (max-width : 890px) {
            .box {
                width: 3rem;
                height: 3rem;
                border: 2px solid black;
            }
            #alive{
                font-size: medium;
                }
                #alive div{
                    font-size: medium;
                }
            .Chess_Elements {

                font-size: 3rem;
                width: 3rem;
                height: 3rem;
            }

            .refresh {
                top: 22rem;
            }

        }

        @media screen and (max-width : 760px) {
            .box {
                width: 2rem;
                height: 2rem;
                border: 2px solid black;
            }
            #move h2{
                font-size: large;
            }
            .Chess_Elements {

                font-size: 2rem;
                width: 2rem;
                height: 2rem;
            }

            .refresh {
                top: 15rem;
            }

        }

        @media screen and (max-width : 630px) {
            .box {
                width: 4rem;
                height: 4rem;
                border: 2px solid black;
            }

            .Chess_Elements {

                font-size: 4rem;
                width: 4rem;
                height: 4rem;
            }

            body {
                display: flex;
                flex-direction: column-reverse;
            }
            .Chess_Board{
                margin-bottom: 6rem;
            }
            #container{
                width: 90%;
            }
            .refresh{
                top: 51rem;
                left: 14rem;
            }
        }
        @media screen and (max-width : 572px) {
            .box {
                width: 3rem;
                height: 3rem;
                border: 2px solid black;
            }
            
            .Chess_Elements {
                
                font-size: 3rem;
                width: 3rem;
                height: 3rem;
            }
            
            #container{
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: auto;
                font-size: medium;
            }
            .refresh{
                top: 44rem;
                left: 7rem;
                margin: auto;
                font-size: small;
            }
        }
        @media screen and (max-width : 446px) {
            .box {
                width: 2.5rem;
                height: 2.5rem;
                border: 1px solid black;
            }
            
            .Chess_Elements {
                
                font-size: 2.5rem;
                width: 2.5rem;
                height: 2.5rem;
            }
            .refresh{
                top: 38rem;
                margin: auto;
            }
            
        }
        @media screen and (max-width : 353px) {
            .box {
                width: 2rem;
                height: 2rem;
                border: 1px solid black;
            }
            
            .Chess_Elements {
                
                font-size: 2rem;
                width: 2rem;
                height: 2rem;
            }
            .refresh{
                top: 34rem;
                margin: auto;
            }
            
        }
        @media screen and (max-width : 295px) {
            .box {
                width: 1.5rem;
                height: 1.5rem;
                border: 1px solid black;
            }
            
            .Chess_Elements {
                
                font-size: 1.5rem;
                width: 1.5rem;
                height: 1.5rem;
            }
            .refresh{
                top: 30rem;
                margin: auto;
                font-size: x-small;
                width: 4rem;
            }
            
        }
        @media screen and (max-width : 235px) {
            .box {
                width: 1.2rem;
                height: 1.2rem;
                border: 1px solid black;
            }
            
            .Chess_Elements {
                
                font-size: 1.2rem;
                width: 1.2rem;
                height: 1.2rem;
            }
            .refresh{
                top: 27rem;
                left: 4rem;
                margin: auto;
            }
            
        }
        </style>
</head>

<body>
    
    <!-- CHESS_BOARD STARTS -->
    <div id="Chess_Board" class="Chess_Board">
        <div class="row" id="row-1">
            <div class="box white" id="1"><div class="Chess_Elements B black_hathi">&#9820</div></div>
            <div class="box black" id="2"><div class="Chess_Elements B black_horse">&#9822</div></div>
            <div class="box white" id="3"><div class="Chess_Elements B black_camel">&#9821</div></div>
            <div class="box black" id="4"><div class="Chess_Elements B black_vajir">&#9819</div></div>
            <div class="box white" id="5"><div class="Chess_Elements B black_king">&#9818</div></div>
            <div class="box black" id="6"><div class="Chess_Elements B black_camel">&#9821</div></div>
            <div class="box white" id="7"><div class="Chess_Elements B black_horse">&#9822</div></div>
            <div class="box black" id="8"><div class="Chess_Elements B black_hathi">&#9820</div></div>
        </div>
        <div class="row" id="row-2">
            <div class="box black" id="9"><div class="Chess_Elements B black_pyada">&#9823</div></div>
            <div class="box white" id="10"><div class="Chess_Elements B black_pyada">&#9823</div></div>
            <div class="box black" id="11"><div class="Chess_Elements B black_pyada">&#9823</div></div>
            <div class="box white" id="12"><div class="Chess_Elements B black_pyada">&#9823</div></div>
            <div class="box black" id="13"><div class="Chess_Elements B black_pyada">&#9823</div></div>
            <div class="box white" id="14"><div class="Chess_Elements B black_pyada">&#9823</div></div>
            <div class="box black" id="15"><div class="Chess_Elements B black_pyada">&#9823</div></div>
            <div class="box white" id="16"><div class="Chess_Elements B black_pyada">&#9823</div></div>
        </div>
        <div class="row" id="row-3">
            <div class="box white" id="17"></div>
            <div class="box black" id="18"></div>
            <div class="box white" id="19"></div>
            <div class="box black" id="20"></div>
            <div class="box white" id="21"></div>
            <div class="box black" id="22"></div>
            <div class="box white" id="23"></div>
            <div class="box black" id="24"></div>
        </div>
        <div class="row" id="row-4">
            <div class="box black" id="25"></div>
            <div class="box white" id="26"></div>
            <div class="box black" id="27"></div>
            <div class="box white" id="28"></div>
            <div class="box black" id="29"></div>
            <div class="box white" id="30"></div>
            <div class="box black" id="31"></div>
            <div class="box white" id="32"></div>
        </div>
        <div class="row" id="row-5">
            <div class="box white" id="33"></div>
            <div class="box black" id="34"></div>
            <div class="box white" id="35"></div>
            <div class="box black" id="36"></div>
            <div class="box white" id="37"></div>
            <div class="box black" id="38"></div>
            <div class="box white" id="39"></div>
            <div class="box black" id="40"></div>
        </div>
        <div class="row" id="row-6">
            <div class="box black" id="41"></div>
            <div class="box white" id="42"></div>
            <div class="box black" id="43"></div>
            <div class="box white" id="44"></div>
            <div class="box black" id="45"></div>
            <div class="box white" id="46"></div>
            <div class="box black" id="47"></div>
            <div class="box white" id="48"></div>
        </div>
        <div class="row" id="row-7">
            <div class="box white" id="49"><div class="Chess_Elements W white_pyada">&#9817</div></div>
            <div class="box black" id="50"><div class="Chess_Elements W white_pyada">&#9817</div></div>
            <div class="box white" id="51"><div class="Chess_Elements W white_pyada">&#9817</div></div>
            <div class="box black" id="52"><div class="Chess_Elements W white_pyada">&#9817</div></div>
            <div class="box white" id="53"><div class="Chess_Elements W white_pyada">&#9817</div></div>
            <div class="box black" id="54"><div class="Chess_Elements W white_pyada">&#9817</div></div>
            <div class="box white" id="55"><div class="Chess_Elements W white_pyada">&#9817</div></div>
            <div class="box black" id="56"><div class="Chess_Elements W white_pyada">&#9817</div></div>
        </div>
        <div class="row" id="row-8">
            <div class="box black" id="57"><div class="Chess_Elements W white_hathi">&#9814</div></div>
            <div class="box white" id="58"><div class="Chess_Elements W white_horse">&#9816</div></div>
            <div class="box black" id="59"><div class="Chess_Elements W white_camel">&#9815</div></div>
            <div class="box white" id="60"><div class="Chess_Elements W white_vajir">&#9813</div></div>
            <div class="box black" id="61"><div class="Chess_Elements W white_king">&#9812</div></div>
            <div class="box white" id="62"><div class="Chess_Elements W white_camel">&#9815</div></div>
            <div class="box black" id="63"><div class="Chess_Elements W white_horse">&#9816</div></div>
            <div class="box white" id="64"><div class="Chess_Elements W white_hathi">&#9814</div></div>
        </div>
    </div>
    <!-- CHESS_BOARD ENDS -->
    <!-- CONTAINER STARTS  -->
    <div id="container">
        <h1>CHESS-LEGENDS</h1>
        <div id="choice">
            What is your choice
            <div id="C">
                <input type="radio" class="myChoice" name="choice" id="White" value="White">
                <h3>White</h3>
                <input type="radio" class="myChoice" name="choice" id="Black" value="Black">
                <h3>Black</h3>
            </div>
        </div>
        <div id="choosed"></div>
        <div id="move"></div>
        <div id="alive"></div>
        <button class="refresh" id="refresh">REFRESH</button>
    </div>
    <!-- CONTAINER ENDS  -->
    <script src="project20_Chess.js"></script>
</body>

</html>
