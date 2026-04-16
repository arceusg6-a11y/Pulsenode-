#!/usr/bin/env python3
"""
Test OpenSea API integration specifically
"""

import requests
import json

# OpenSea API test
OPENSEA_API_KEY = "B3E8F96C7A6B4"
OPENSEA_BASE_URL = "https://api.opensea.io/api/v2"

def test_opensea_api():
    """Test OpenSea API directly"""
    print("\n=== Testing OpenSea API Integration ===")
    
    # Test collection stats endpoint
    try:
        collection_slug = "boredapeyachtclub"
        url = f"{OPENSEA_BASE_URL}/collections/{collection_slug}/stats"
        headers = {"X-API-KEY": OPENSEA_API_KEY}
        
        print(f"Testing OpenSea URL: {url}")
        print(f"API Key: {OPENSEA_API_KEY}")
        
        response = requests.get(url, headers=headers, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:500]}...")
        
        if response.status_code == 200:
            print("✅ OpenSea API working")
            return True
        elif response.status_code == 401:
            print("❌ OpenSea API - Invalid API key")
            return False
        elif response.status_code == 403:
            print("❌ OpenSea API - Forbidden (API key may be invalid or rate limited)")
            return False
        else:
            print(f"❌ OpenSea API - Status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ OpenSea API test failed - exception: {str(e)}")
        return False

def test_reservoir_api():
    """Test Reservoir API directly"""
    print("\n=== Testing Reservoir API Integration ===")
    
    try:
        # Test a known contract address
        contract_address = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"  # BAYC
        url = f"https://api.reservoir.tools/collections/v7"
        params = {"id": contract_address}
        
        print(f"Testing Reservoir URL: {url}")
        print(f"Contract: {contract_address}")
        
        response = requests.get(url, params=params, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:500]}...")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("collections"):
                print("✅ Reservoir API working")
                return True
            else:
                print("❌ Reservoir API - No collections data")
                return False
        else:
            print(f"❌ Reservoir API - Status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Reservoir API test failed - exception: {str(e)}")
        return False

if __name__ == "__main__":
    print("🔍 Testing External API Integrations")
    
    opensea_result = test_opensea_api()
    reservoir_result = test_reservoir_api()
    
    print("\n" + "="*50)
    print("📊 API INTEGRATION RESULTS")
    print("="*50)
    print(f"OpenSea API: {'✅ WORKING' if opensea_result else '❌ FAILED'}")
    print(f"Reservoir API: {'✅ WORKING' if reservoir_result else '❌ FAILED'}")
    
    if not opensea_result and not reservoir_result:
        print("\n⚠️  Both floor price APIs are failing - floor prices will be 0")
    elif opensea_result and not reservoir_result:
        print("\n✅ OpenSea working, Reservoir failing - should use OpenSea as primary")
    elif reservoir_result and not opensea_result:
        print("\n✅ Reservoir working, OpenSea failing - using Reservoir as fallback")
    else:
        print("\n🎉 Both APIs working!")