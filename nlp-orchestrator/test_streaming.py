"""
Quick integration test for streaming functionality.
Tests that stream_groq_chat and stream_synthesize_answers work correctly.
"""

import asyncio
import sys
from synthesizer import stream_synthesize_answers
from research import stream_groq_chat

async def test_stream_groq_chat():
    """Test that stream_groq_chat yields tokens incrementally."""
    print("\n=== Testing stream_groq_chat() ===")
    
    messages = [
        {
            "role": "user",
            "content": "What is the Indian Penal Code Section 304A? Answer in 1 sentence."
        }
    ]
    
    token_count = 0
    full_response = ""
    
    async for token in stream_groq_chat(messages, model="mixtral-8x7b-32768", max_tokens=100):
        token_count += 1
        full_response += token
        print(f"Token {token_count}: {repr(token)}")
    
    print(f"\n✓ Received {token_count} tokens")
    print(f"Full response: {full_response}\n")
    return token_count > 0


async def test_stream_synthesize():
    """Test that stream_synthesize_answers yields tokens incrementally."""
    print("\n=== Testing stream_synthesize_answers() ===")
    
    research_results = [
        {
            "question": "What is IPC 304A?",
            "answer": "Section 304A of the Indian Penal Code deals with causing death by negligence.",
            "source": "groq"
        },
        {
            "question": "What are the penalties?",
            "answer": "Imprisonment up to 2 years or fine up to Rs 1000 or both.",
            "source": "groq"
        }
    ]
    
    token_count = 0
    full_response = ""
    
    async for token in stream_synthesize_answers("Tell me about IPC 304A", research_results):
        token_count += 1
        full_response += token
        print(f"Token {token_count}: {repr(token)}")
    
    print(f"\n✓ Received {token_count} tokens")
    print(f"Full response: {full_response}\n")
    return token_count > 0


async def main():
    print("=" * 60)
    print("STREAMING INTEGRATION TESTS")
    print("=" * 60)
    
    try:
        result1 = await test_stream_groq_chat()
        result2 = await test_stream_synthesize()
        
        print("\n" + "=" * 60)
        if result1 and result2:
            print("✅ ALL TESTS PASSED - Streaming is working!")
            return 0
        else:
            print("❌ SOME TESTS FAILED")
            return 1
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(exit_code)
