function binarySearch(arr, number) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        if (arr[mid] === number) {
            return "Found at index " + mid;
        } else if (number < arr[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }

    return "Number not found";
}
console.log(binarySearch([3, 7, 12, 18, 21, 25, 33, 39, 42, 56, 67, 72, 88, 91, 100],3))

