#!/bin/bash
cd /home/opc/docker/nginx/pac/
git clone git@ssh.dev.azure.com:v3/PrimaAFPTeam/PrimaAppNewPac/prima-new-pac-app
mv prima-new-pac-app/Dockerfile .
mv prima-new-pac-app/kubernetes.yaml .
mv prima-new-pac-app/service.yaml .
rm -fr $HOME/.kube
mkdir -p $HOME/.kube
#oci ce cluster create-kubeconfig --cluster-id ocid1.cluster.oc1.iad.aaaaaaaaaftdcnbygntdgyrtgaytqnbwhe2dazbthaywkyrxmc3tkmldmq4d --file $HOME/.kube/config --region us-ashburn-1 --token-version 2.0.0 
export KUBECONFIG=$HOME/.kube/config
kubectl apply -f kubernetes.yaml
kubectl apply -f service.yaml
rm -fr prima-new-pac-app
