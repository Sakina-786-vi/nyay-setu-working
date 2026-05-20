"""
Test SSE streaming endpoints.
Run the app first: python main.py

Then in another terminal:
    python test_sse_endpoints.py
"""

import asyncio
import httpx
import json
import sys

API_BASE = "http://localhost:8001"


async def test_deep_research_stream():
    """Test /research/deep endpoint for streaming."""
    print("\n=== Testing /research/deep streaming ===")
    print("This is the endpoint used by the frontend for deep research...")
    
    query = {
        "query": "What is the Indian Penal Code Section 304A and what are its penalties?",
        "language": "en"
    }
    
    event_count = 0
    token_count = 0
    
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            async with client.stream(
                "POST",
                f"{API_BASE}/research/deep",
                json=query
            ) as response:
                print(f"Response status: {response.status_code}")
                
                buffer = ""
                async for line in response.aiter_lines():
                    if line.startswith("data: "):
                        event_count += 1
                        try:
                            event_data = json.loads(line[6:])
                            event_type = event_data.get("type")
                            
                            if event_type == "reasoning":
                                token_count += 1
                                print(f"[Token {token_count}] {repr(event_data.get('text', '')[:50])}")
                            elif event_type in ["stage", "synthesis_token"]:
                                print(f"[{event_type}] {event_data}")
                            
                            print(f"Event {event_count}: {event_type}")
                        except json.JSONDecodeError:
                            pass
    
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    
    print(f"\n✓ Received {event_count} events, {token_count} reasoning tokens")
    return event_count > 0


async def test_analyze_stream():
    """Test /api/legal/analyze-stream endpoint."""
    print("\n=== Testing /api/legal/analyze-stream streaming ===")
    print("This endpoint combines decomposition, research, and synthesis...")
    
    query = {
        "query": "What are my legal rights if I'm accused of theft under IPC?",
        "language": "en"
    }
    
    event_count = 0
    token_count = 0
    
    try:
        async with httpx.AsyncClient(timeout=120.0) as client:
            async with client.stream(
                "POST",
                f"{API_BASE}/api/legal/analyze-stream",
                json=query
            ) as response:
                print(f"Response status: {response.status_code}")
                
                async for line in response.aiter_lines():
                    if line.startswith("data: "):
                        event_count += 1
                        try:
                            event_data = json.loads(line[6:])
                            event_type = event_data.get("type")
                            
                            if event_type == "synthesis_token":
                                token_count += 1
                                chunk = event_data.get("chunk", "")
                                print(f"[SynthesisToken {token_count}] {repr(chunk[:60])}")
                            else:
                                print(f"[{event_type}] {event_data}")
                        except json.JSONDecodeError:
                            pass
    
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    
    print(f"\n✓ Received {event_count} events, {token_count} synthesis tokens")
    return event_count > 0


async def main():
    print("=" * 70)
    print("SSE STREAMING ENDPOINTS TEST")
    print("=" * 70)
    print(f"Testing API at: {API_BASE}")
    print("\nNote: Make sure the backend is running with: python main.py")
    
    # First check if server is up
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            health = await client.get(f"{API_BASE}/health")
            print(f"✓ Backend health: {health.json()}")
    except Exception as e:
        print(f"❌ Cannot reach backend at {API_BASE}")
        print(f"   Error: {e}")
        print(f"   Please start the backend first: cd nlp-orchestrator && python main.py")
        return 1
    
    try:
        result1 = await test_deep_research_stream()
        print("\n" + "-" * 70)
        result2 = await test_analyze_stream()
        
        print("\n" + "=" * 70)
        if result1 and result2:
            print("✅ ALL STREAMING TESTS PASSED!")
            return 0
        else:
            print("⚠️  SOME TESTS HAD ISSUES")
            return 1
    except KeyboardInterrupt:
        print("\n\n⏹️  Tests interrupted by user")
        return 1
    except Exception as e:
        print(f"\n❌ FATAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(exit_code)
