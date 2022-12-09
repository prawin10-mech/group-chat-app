import java.util.HashMap;
import java.util.Scanner;

class frequencyCount{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int arr[] = new int[n];
        HashMap<Integer, Integer> map = new HashMap<>();
        for(int i=0;i<n;i++){
            arr[i] = sc.nextInt();
        }
        for(int i=0;i<n;i++){
            if(map.containsKey(arr[i])){
                int pre = map.get(arr[i])+1;
                map.put(arr[i], pre);
            }
            else{
                map.put(arr[i], 1);
            }
        }
        System.out.println(map);

    }
}