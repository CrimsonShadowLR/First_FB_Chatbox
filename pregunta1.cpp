#include <bits/stdc++.h>
using namespace std;
int main(){
    string cad;
    while(getline(cin,cad)){
        int last_char=cad.length();
        map <char,int> frequency_char;
        for (int i=0;i<last_char;i++){
            char char_now=cad[i];
            int aux_freq=frequency_char[char_now];
            frequency_char[char_now]=aux_freq+1;
        }
        int flag_char_delete=0;
        map <char,int>::iterator it;
        map <int,int> frequency_of_frequency;
        for (it=frequency_char.begin();it!=frequency_char.end();it++){
            // cout<<it->first<<' '<<it->second<<" /// ";
            int aux=frequency_of_frequency[it->second];
            frequency_of_frequency[it->second]=aux+1;
        }
        int tam_frequency_of_frequency=frequency_of_frequency.size();
        if (tam_frequency_of_frequency>2){
            cout<<"NO"<<endl;
        }
        else if(tam_frequency_of_frequency==2){
            map <int,int>::iterator it2;
            it2=frequency_of_frequency.begin();
            int key1, key2, freq1, freq2;
            key1=it2->first;
            freq1=it2->second;
            it2++;
            key2=it2->first;
            freq2=it2->second;
            if(key2-key1==1 && freq2==1){
                cout<<"YES"<<endl;
            }
            else if(key1==1 && freq1==1){
                cout<<"YES"<<endl;
            }
            else{
                cout<<"NO"<<endl;
            }
        }
        else{
            cout<<"YES"<<endl;
        }
    }
    return 0;
}