def sort(A):
    less = []
    equal = []
    greater = []

    if len(A) > 1:
        pivot = A[0]
        for x in A:
            if x < pivot:
                less.append(x)
            elif x == pivot:
                equal.append(x)
            elif x > pivot:
                greater.append(x)
        # Don't forget to return something!
        # Just use the + operator to join lists
        return sort(less)+equal+sort(greater)
    # Note that you want equal ^^^^^ not pivot
    # You need to handle the part at the end of the recursion - when you only have one element in your array, just return the array.
    else:
        return A

print(sort([12,4,5,6,7,3,1,15]))