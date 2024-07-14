#include<bits/stdc++.h>
using namespace std;

// // Comparator function to sort by length and then alphabetically
// bool compare(const string &a, const string &b) {
//     if (a.size() == b.size())
//         return a < b;  // If lengths are the same, sort alphabetically
//     return a.size() < b.size();  // Otherwise, sort by length
// }

// int main() {
//     vector<string> arr = {"apple", "banana", "pear", "grape", "kiwi", "blueberry", "melon"};

//     // Sorting the array using the custom comparator
// sort(arr.begin(), arr.end(), compare);

//     // Printing the sorted array
//     for (const auto &str : arr) {
//         cout << str << " ";
//     }
//     cout << std::endl;

//     return 0;
// };


// Function to compare two strings based on length and lexicographically
bool compare(const std::string &a, const std::string &b) {
    if (a.size() == b.size())
        return a < b;  // If lengths are the same, sort alphabetically
    return a.size() < b.size();  // Otherwise, sort by length
}

// Function to swap two strings
void swap(std::string &a, std::string &b) {
    std::string temp = a;
    a = b;
    b = temp;
}

// Function to sort the array using bubble sort
void bubbleSort(std::vector<std::string> &arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (!compare(arr[j], arr[j + 1])) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    std::vector<std::string> arr = {"apple", "banana", "pear", "grape", "kiwi", "blueberry", "melon"};

    // Sorting the array using bubble sort
    bubbleSort(arr);

    // Printing the sorted array
    for (const auto &str : arr) {
        std::cout << str << " ";
    }
    std::cout << std::endl;

    return 0;
}

