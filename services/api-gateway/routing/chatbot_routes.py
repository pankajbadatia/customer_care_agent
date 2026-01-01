from fastapi import APIRouter, Request
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/chatbot", tags=["chatbot"])


# -------------------------------------------------------------------
# Schemas
# -------------------------------------------------------------------

class ChatRequest(BaseModel):
    conversation_id: Optional[str] = None
    message: str


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatResponse(BaseModel):
    conversation_id: str
    messages: list[ChatMessage]


# -------------------------------------------------------------------
# Routes
# -------------------------------------------------------------------

@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest, request: Request) -> ChatResponse:
    """
    Temporary chatbot stub.

    Reads authenticated user context from request.state.user
    (set by AuthContextMiddleware).
    """

    user = getattr(request.state, "user", None)
    user_email = user["sub"] if user else "unknown"

    return ChatResponse(
        conversation_id=req.conversation_id or "conv_demo",
        messages=[
            ChatMessage(
                role="assistant",
                content=f"Hi {user_email}, you said: '{req.message}'",
            )
        ],
    )
