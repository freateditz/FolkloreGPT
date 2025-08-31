import requests
import sys
from datetime import datetime
import json

class FolkloreGPTAPITester:
    def __init__(self, base_url="https://fix-finder-9.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            result = {
                'name': name,
                'method': method,
                'url': url,
                'expected_status': expected_status,
                'actual_status': response.status_code,
                'success': success,
                'response_data': None,
                'error': None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result['response_data'] = response.json()
                    print(f"Response: {json.dumps(result['response_data'], indent=2)}")
                except:
                    result['response_data'] = response.text
                    print(f"Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    result['response_data'] = response.json()
                    print(f"Error Response: {json.dumps(result['response_data'], indent=2)}")
                except:
                    result['response_data'] = response.text
                    print(f"Error Response: {response.text}")

            self.test_results.append(result)
            return success, result['response_data']

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                'name': name,
                'method': method,
                'url': url,
                'expected_status': expected_status,
                'actual_status': None,
                'success': False,
                'response_data': None,
                'error': str(e)
            }
            self.test_results.append(result)
            return False, {}

    def test_hello_world(self):
        """Test the root endpoint"""
        return self.run_test(
            "Hello World API",
            "GET",
            "",
            200
        )

    def test_create_status_check(self):
        """Test creating a status check"""
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        
        success, response = self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=test_data
        )
        
        if success and response:
            return response.get('id'), response.get('client_name')
        return None, None

    def test_get_status_checks(self):
        """Test getting all status checks"""
        success, response = self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )
        return success, response

    def print_summary(self):
        """Print test summary"""
        separator = "=" * 50
        print(f"\n{separator}")
        print(f"📊 BACKEND API TEST SUMMARY")
        print(f"{separator}")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed < self.tests_run:
            print(f"\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    error_msg = result.get('error', f'Status {result.get("actual_status", "Unknown")}')
                    print(f"  - {result['name']}: {error_msg}")
        
        return self.tests_passed == self.tests_run

def main():
    print("🚀 Starting FolkloreGPT Backend API Tests...")
    
    # Setup
    tester = FolkloreGPTAPITester()
    
    # Test 1: Hello World endpoint
    hello_success, hello_response = tester.test_hello_world()
    
    # Test 2: Create status check
    status_id, client_name = tester.test_create_status_check()
    
    # Test 3: Get status checks
    get_success, status_list = tester.test_get_status_checks()
    
    # Verify the created status check appears in the list
    if status_id and get_success and status_list:
        found_status = False
        for status in status_list:
            if status.get('id') == status_id:
                found_status = True
                print(f"✅ Created status check found in list: {status_id}")
                break
        
        if not found_status:
            print(f"❌ Created status check NOT found in list: {status_id}")
    
    # Print final results
    all_passed = tester.print_summary()
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())