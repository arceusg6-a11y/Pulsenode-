#!/usr/bin/env python3
"""
Backend API Testing for Pulse Node NFT Portfolio Tracker
Tests all backend endpoints and integrations
"""

import requests
import json
import time
import os
from urllib.parse import urljoin

# Get base URL from environment
BASE_URL = "https://node-portfolio-1.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

# Test wallet address (from review request)
TEST_WALLET = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"

def test_health_check():
    """Test the health check endpoint"""
    print("\n=== Testing Health Check Endpoint ===")
    try:
        response = requests.get(f"{API_BASE}/", timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Pulse Node API is running" and data.get("status") == "ok":
                print("✅ Health check passed")
                return True
            else:
                print("❌ Health check failed - incorrect response format")
                return False
        else:
            print(f"❌ Health check failed - status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check failed - exception: {str(e)}")
        return False

def test_nft_fetching_ethereum():
    """Test NFT fetching for Ethereum network"""
    print("\n=== Testing NFT Fetching - Ethereum Network ===")
    try:
        url = f"{API_BASE}/nfts/{TEST_WALLET}?network=ethereum"
        print(f"Testing URL: {url}")
        
        response = requests.get(url, timeout=60)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response keys: {list(data.keys())}")
            
            # Verify required fields
            required_fields = ["address", "totalNFTs", "displayedNFTs", "totalValue", "portfolioPNL", "nfts"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                print(f"❌ Missing required fields: {missing_fields}")
                return False
            
            print(f"Address: {data['address']}")
            print(f"Total NFTs: {data['totalNFTs']}")
            print(f"Displayed NFTs: {data['displayedNFTs']}")
            print(f"Total Value: {data['totalValue']} ETH")
            print(f"Portfolio PNL: {data['portfolioPNL']}%")
            print(f"NFTs array length: {len(data['nfts'])}")
            
            # Test NFT object structure
            if data['nfts']:
                nft = data['nfts'][0]
                nft_required_fields = ["tokenId", "name", "image", "contractAddress", "floorPrice", "purchasePrice", "pnl", "attributes"]
                nft_missing_fields = [field for field in nft_required_fields if field not in nft]
                
                if nft_missing_fields:
                    print(f"❌ NFT object missing fields: {nft_missing_fields}")
                    return False
                
                print(f"Sample NFT: {nft['name']} (Token ID: {nft['tokenId']})")
                print(f"Floor Price: {nft['floorPrice']} ETH")
                print(f"Purchase Price: {nft['purchasePrice']} ETH")
                print(f"PNL: {nft['pnl']}%")
                
            print("✅ Ethereum NFT fetching passed")
            return True
        else:
            print(f"❌ Ethereum NFT fetching failed - status code {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Ethereum NFT fetching failed - exception: {str(e)}")
        return False

def test_nft_fetching_base():
    """Test NFT fetching for Base network"""
    print("\n=== Testing NFT Fetching - Base Network ===")
    try:
        url = f"{API_BASE}/nfts/{TEST_WALLET}?network=base"
        print(f"Testing URL: {url}")
        
        response = requests.get(url, timeout=60)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response keys: {list(data.keys())}")
            
            # Verify required fields
            required_fields = ["address", "totalNFTs", "displayedNFTs", "totalValue", "portfolioPNL", "nfts"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                print(f"❌ Missing required fields: {missing_fields}")
                return False
            
            print(f"Address: {data['address']}")
            print(f"Network: {data.get('network', 'not specified')}")
            print(f"Total NFTs: {data['totalNFTs']}")
            print(f"Displayed NFTs: {data['displayedNFTs']}")
            print(f"Total Value: {data['totalValue']} ETH")
            print(f"Portfolio PNL: {data['portfolioPNL']}%")
            
            print("✅ Base NFT fetching passed")
            return True
        else:
            print(f"❌ Base NFT fetching failed - status code {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Base NFT fetching failed - exception: {str(e)}")
        return False

def test_activity_feed():
    """Test the activity feed endpoint"""
    print("\n=== Testing Activity Feed Endpoint ===")
    try:
        response = requests.get(f"{API_BASE}/activity", timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response keys: {list(data.keys())}")
            
            if "activity" not in data:
                print("❌ Activity feed missing 'activity' field")
                return False
            
            activities = data["activity"]
            print(f"Number of activities: {len(activities)}")
            
            if activities:
                activity = activities[0]
                required_fields = ["id", "type", "nftName", "price", "timestamp"]
                missing_fields = [field for field in required_fields if field not in activity]
                
                if missing_fields:
                    print(f"❌ Activity object missing fields: {missing_fields}")
                    return False
                
                print(f"Sample activity: {activity['nftName']} - {activity['price']} ETH")
                print(f"Type: {activity['type']}, Timestamp: {activity['timestamp']}")
            
            print("✅ Activity feed passed")
            return True
        else:
            print(f"❌ Activity feed failed - status code {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Activity feed failed - exception: {str(e)}")
        return False

def test_invalid_endpoints():
    """Test invalid endpoints return proper 404"""
    print("\n=== Testing Invalid Endpoints ===")
    try:
        response = requests.get(f"{API_BASE}/invalid-endpoint", timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 404:
            data = response.json()
            if "error" in data:
                print("✅ Invalid endpoint properly returns 404")
                return True
            else:
                print("❌ 404 response missing error field")
                return False
        else:
            print(f"❌ Invalid endpoint should return 404, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Invalid endpoint test failed - exception: {str(e)}")
        return False

def test_error_handling():
    """Test error handling with invalid wallet address"""
    print("\n=== Testing Error Handling ===")
    try:
        # Test with invalid wallet address
        invalid_wallet = "invalid-address"
        url = f"{API_BASE}/nfts/{invalid_wallet}"
        print(f"Testing with invalid wallet: {url}")
        
        response = requests.get(url, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        # Should either return 400/500 with error or handle gracefully
        if response.status_code in [400, 500]:
            data = response.json()
            if "error" in data:
                print("✅ Error handling working - returns proper error response")
                return True
        elif response.status_code == 200:
            # If it returns 200, check if it handles gracefully
            data = response.json()
            if "error" in data or data.get("totalNFTs", 0) == 0:
                print("✅ Error handling working - graceful handling of invalid address")
                return True
        
        print("❌ Error handling may need improvement")
        return False
    except Exception as e:
        print(f"❌ Error handling test failed - exception: {str(e)}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("🚀 Starting Backend API Tests for Pulse Node NFT Portfolio Tracker")
    print(f"Base URL: {BASE_URL}")
    print(f"API Base: {API_BASE}")
    print(f"Test Wallet: {TEST_WALLET}")
    
    results = {}
    
    # Run all tests
    results["health_check"] = test_health_check()
    results["nft_ethereum"] = test_nft_fetching_ethereum()
    results["nft_base"] = test_nft_fetching_base()
    results["activity_feed"] = test_activity_feed()
    results["invalid_endpoints"] = test_invalid_endpoints()
    results["error_handling"] = test_error_handling()
    
    # Summary
    print("\n" + "="*60)
    print("📊 TEST RESULTS SUMMARY")
    print("="*60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend tests passed!")
    else:
        print("⚠️  Some tests failed - check logs above for details")
    
    return results

if __name__ == "__main__":
    run_all_tests()