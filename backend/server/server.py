from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.routers import pipes
import yfinance as yf
import pandas as pd
app = FastAPI()
from datetime import datetime, timedelta
from fastapi.responses import JSONResponse
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from server.routers import pipes, users, testing


class InputError(Exception):
    def __init__(self, code: int, message: str):
        self.code = 400
        self.message = 'No message specified'


app = FastAPI()


@app.exception_handler(InputError)
async def unicorn_exception_handler(request: Request, exc: InputError):
    return JSONResponse(
        status_code=400,
        content={
            "message": f"Oops! {exc.message} did something. There goes a rainbow..."},
    )

origins = [
    "172.21.0.1:37848",
    "http://host.docker.internal",
    "http://host.docker.internal:8080",
    "http://host.docker.internal:8000",
    "http://host.docker.internal:3000",
    "http://host.docker.internal:3001",
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(pipes.router)
app.include_router(users.router)
app.include_router(testing.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}
@app.get('/get_stock_data/{stock_name}')  # Changed to GET
async def get_stock_data(stock_name:str):
    try:
        stock_data = yf.Ticker(stock_name)
        stock_data = stock_data.history().reset_index().to_dict(orient='list')  # Convert to dictionary
        return stock_data
    except Exception as e:  # Catch specific exception (optional but recommended)
        print(f"Error: {e}")
        return JSONResponse(content={"error": "Stock name is wrong"}, status_code=400)
"""
@app.get('/get_stock_chart/{symbol}')
def get_stock_chart(symbol: str):
    stock_data = get_stock_data(symbol)
    generate_stock_chart(stock_data)
    return {"message": "Chart generated successfully!"}
#pandas DataFrame
def generate_stock_chart(stock_data):
    # Assuming stock_data is a pandas DataFrame with Date and Close columns
    plt.plot(stock_data['Date'], stock_data['Close'])
    plt.xlabel('Date')
    plt.ylabel('Closing Price')
    plt.title('Stock Price Chart')
    plt.xticks(rotation=45)
    plt.tight_layout()

    # Save the chart to a file (optional)
    plt.savefig('stock_chart.png')

    # Show the chart (optional)
    plt.show()
"""
